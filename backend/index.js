const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const createJWT = require('./middleware/jwt/create_jwt')
const app = express();
const cookieParser = require('cookie-parser')
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const db = mysql.createConnection({
  host: '192.168.1.120',
  user: 'dev1',
  password: 'jeevan@12345',
  port:3308,
  database: 'company_skills'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

app.get('/', (req, res) => {
  res.send('Hello from your backend server.');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    const [result] = await db.promise().query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user. Please try again.' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE EmailID = ? AND Password = ?', [email, password]);

    if (rows.length > 0) {
      //console.log(rows[0].UserID)
      const token = createJWT.generateToken(rows[0].UserID)
      res.cookie("hrjwt",token,{httpOnly:true})
      res.status(200).json({ message: 'Logged in successfully.' });
    } else {
      res.status(401).json({ error: 'Invalid email or password.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to log in. Please try again.' });
  }
});


app.get("/userDashBoard",(req,res) => {
  const token  = req.cookies.hrjwt;

  if(token)
  {
    createJWT.verifyToken(token);
      res.send("Authorised").status(200);
      
  }
  else{
    res.send("Unauthorized Access")
  }
})

app.post("/generatetoken", (req,res) => {
  const { id } = req.body;
  const token = createJWT.generatetoken(id);
  res.cookie("hr-jwt",token,{httpOnly:true, expires:  2000})
  res.send("Successful").status(200)

})