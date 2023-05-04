const { Router } = require("express")
const { requireAuth } = require("../../middleware/authMiddleware");


const router = Router();


router.get("/userdashboard",requireAuth,(req,res) => {
    res.send("User DashBoard Page").status(200);
})


module.exports = router;