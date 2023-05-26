const handleErrors = require("../error/errorhandler");
const { hashPassword,verifyPassword } = require("../middleware/encryption/encrypt");
const db = require("./connectDb");
const {sqlQuery} = require("./query")



const UpdatePasswordwithId = async ({userId,newPassword}) =>{
    

    const hashedPassword = await hashPassword(newPassword);

    try{
    db.promise().query(sqlQuery.updatePassword,[hashedPassword,userId]);
    
    return true
    }
    catch(err){
        const Error = handleErrors(err);
        return false
    }
}


const Login = async ({email,password}) =>{

    //console.log(email)
    try{
        const [rows] = await db.promise().query(sqlQuery.LoginUser,[email]);

        if(rows.length == 0){
            throw {message:"Incorrect Username",code:404}
        }

      
        const result = await verifyPassword(password,rows[0].Password);

        if(!result){
            throw {message:"Incorrect Password. Try Again",code:404}
        }

        return {success:true,AccessId:rows[0].AccessID,UserId:rows[0].UserID}
        
    }
    catch(err){
        const Error = handleErrors(err);
        return{success:false,message:Error.message,code:Error.code}
    }

}


const Search = async ({searchValue}) =>{

    const searchParameter = '%' + searchValue + '%';
    var skillDetails;
    try{
        const [matchedProfiles] = await db.promise().query("CALL SEARCH_ALL(?)",[searchParameter])
        const data = matchedProfiles[0]

        if(data.length <= 0){
            throw ({message:"Not Records Match the Search Value"})
        }
        for(let i=0;i<data.length;i++){
            [skillDetails] = await db.promise().query("CALL GET_SKILL_DETAILS(?)",[data[i].UserID])
            data[i].skills = skillDetails[0];
        }
        return ({data:data,success:true})
    }
    catch(err){
        const Error = handleErrors(err)
        return({success:false,message:Error.message,code:Error.code})
    }
};


module.exports.UpdatePasswordwithId = UpdatePasswordwithId;
module.exports.Login = Login;
module.exports.Search = Search;