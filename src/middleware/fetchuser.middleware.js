const db = require("../config/databaseconnection");

const fetchUser = (req, res, next) => {
    const { username, email } = req.body;
    let fetchQuery, queryParams;
    if (username) {
        // If username is provided, fetch user by username
        fetchQuery = 'SELECT * FROM user WHERE username = ?';
        queryParams = [username];
    }
    if (email) {
        fetchQuery = 'SELECT * FROM user WHERE email = ?';
        queryParams = [email];
    }
    if (!username && !email) {
        res.status(400).json({ error: 'Username or email is required' });
    }

    // Execute the query
    db.query(fetchQuery, queryParams, (err, result) => {
        if (err) {
            console.error('Error while fetching user:', err);
         res.status(500).send('Error fetching user');
        }

        // If user found, send user data
        if (result.length > 0) {
            console.log("User found");
            req.user = result[0];
            next();
        } else {
            console.log("User does not exist");
         res.status(401).json({message:"User does not exist"});
        }
    });
}

module.exports = fetchUser;
