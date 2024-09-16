const db = require("../config/databaseconnection");

const fetchUserExistance = (req, res, next) => {
    const { username, email } = req.body;

    if (!(username || email)) {
        // If neither username nor email is provided, return a 400 status code with an informative message
        return res.status(400).send('Username or email must be provided');
    }

    let fetchQuery, queryParams;

    if (username && email) {
       // If either username or email is provided, fetch user by either username or email
       fetchQuery = 'SELECT * FROM user WHERE username = ? OR email = ?';
       queryParams = [username, email];
    } else if (username) {
        // If only username is provided, fetch user by username
        fetchQuery = 'SELECT * FROM user WHERE username = ?';
        queryParams = [username];
    } else {
        // If only email is provided, fetch user by email
        fetchQuery = 'SELECT * FROM user WHERE email = ?';
        queryParams = [email];
    }
   

    // Execute the query
    db.query(fetchQuery, queryParams, (err, result) => {
        if (err) {
            console.error('Error while fetching user:', err);
            return res.status(500).send('Error fetching user');
        }
        // If user found, send a 409 status code with an appropriate message
        if (result.length > 0) {
            console.log("User already exists");
            return res.status(409).json({message:"User already existsccc",result});
        }

        // If user not found, proceed to the next middleware
        console.log("User does not exist");
        next();
    });
};

module.exports = fetchUserExistance;
