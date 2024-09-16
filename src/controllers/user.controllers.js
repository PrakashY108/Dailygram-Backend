const db = require("../config/databaseconnection");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    const { firstName, lastName, email, username, password, DOB, phoneNo } = req.body;
    const { file } = req;

    // Check if required fields are provided
    if (!username || !password || !firstName || !email || !DOB || !phoneNo) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Define the SQL query to insert a new user into the database
    const insertUserQuery = `INSERT INTO user (firstName, lastName, email, username, password, DOB, phoneNo) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Execute the SQL query to insert the user
    db.query(insertUserQuery, [firstName, lastName, email, username, hashedPassword, DOB, phoneNo], (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: 'Error creating user' });
        }
        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully' });
    });
};

module.exports = createUser;


const loginUser = (req, res) => {
    const { username, password } = req.body;
    // Query to fetch user from database
    const fetchQuery = 'SELECT * FROM user WHERE username = ?';

    db.query(fetchQuery, [username], (err, result) => {
        if (err) {
            console.error('Error while fetching user:', err);
            res.status(500).send('Error fetching user');
            return;
        }

        // If user found
        if (result.length > 0) {
            const user = result[0]; // Accessing the user data from the result
            console.log(user)
            // Compare passwords
            bcrypt.compare(password, user.password, (err, correct) => {
                if (err) {
                    console.log("Error while verifying password", err);
                    res.status(401).send("Invalid Credentials")
                }
                if (correct) {
                 console.log("Correct crendential")
                    // generate accessToken
                    const userid=user.userid;
                    const username=user.username;
                    const accessToken = jwt.sign({userid,username,password},process.env.JWT_SECRET)
                    console.log(accessToken); 
                    const Query =`UPDATE user SET accessToken =? WHERE username = ?`
                    db.query(Query,[accessToken,username],(error)=>{
                        if(error){
                        console.log("Error updating refreshToken",error);
                        res.status(500).send("Error updating accessToken")
                        }
                        res.status(200).json({message:"logged in",
                            accessToken:accessToken
                        })
                    })
                } else {
                    res.status(401).send("Invalid crendital please enter correct details")
                }
            })


        } else {
            res.status(404).send('User doesnot exists create account first');
        }
    });
}

module.exports= {createUser,loginUser}