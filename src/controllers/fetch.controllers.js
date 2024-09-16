const db = require("../config/databaseconnection")

const fetchUserDetails = (req, res) => {
    console.log(req.user);
    console.log(req.user);
    res.status(201).send(req.user);
}
const fetchUsersPosts = async (req, res) => {
    const userid = await req.user.userid
    console.log(userid);

    const fetchQuery = `SELECT * FROM posts WHERE userid =?`
    db.query(fetchQuery, [70], (err, result) => {
        if (err) {
            console.error('Error while fetching user\'s post:');
            res.status(500).json({message:'Error fetching user\'s post', err});
            return;
        }

        if (result.length > 0) {
            res.status(201).json(result)
        } else {
            console.log('You haven`t post yet.');
            res.status(201).json([]);
            return;
        }
    })
}


const fetchAllUserFromDB = (req, res) => {

    const fetchQuery = 'SELECT * FROM user';

    // Acquire a connection from the pool and execute the query
    db.query(fetchQuery, (error, results) => {
        if (error) {
            console.error('Error while fetching users:', error);
            res.status(500).json({ error: 'Error while fetching users' });
            return;
        }
        delete results.password;
        delete results.accessToken;
        // Send the fetched users as JSON response
        res.status(200).json(results);
    });
}

// ROUTE 3 : To fetch allposts
const fetchallPostsFromDB = (req, res) => {
    const fetchQuery = `SELECT * FROM posts ORDER BY createdAt DESC LIMIT ${10}`
    db.query(fetchQuery, (err, result) => {
        if (err) {
            console.log("Error ehile fetching data", err);
            return;
        }
        if (result.length > 0) {
            res.status(201).json(result)
        }
        else {
            console.log("No post found");
            res.status(201).send("No post found ")
        }
    })
}
const fetchallStoriesFromDB = (req, res) => {
    const fetchQuery = `SELECT * FROM storiesuser `
    db.query(fetchQuery, (err, results) => {
        if (err) {
            console.log("Error ehile fetching stories", err);
            res.status(500).json({ error: "Error ehile fetching stories" })

        }
        if (results.length > 0) {
            res.status(201).send(results)
        }
        else {
            console.log("No stories found");
            res.status(201).send("No stories found ")
        }
    })
}
const fetchallreelsFromDB = (req, res) => {
    const fetchQuery = `SELECT * FROM videos ORDER BY createdAt DESC LIMIT ${1}`
    db.query(fetchQuery, (err, results) => {
        if (err) {
            console.log("Error while fetching stories", err);
            res.status(200).json({ error: "Error while fetching reels" })

        }
        if (results.length > 0) {
            res.status(201).send(results)
        }
        else {
            console.log("No reels found");
            res.status(201).send("No reels found ")
        }
    })
}

const fetchNotification = (req, res) => {
    const userid = req.user.userid
    console.log(userid);

    const fetchQuery = `SELECT * FROM notifications WHERE userid = ?`;
    db.query(fetchQuery, [userid], (err, result) => {
        if (err) {
            console.error("Error while fetching: ", err);
            return res.status(500).json({ error: "Error while fetching notifications" });
        }
        if (result.length > 0) {
            console.log("Notifications fetched successfully:", result);
            return res.status(200).json(result);
        } else {
            console.log("No notification found", );
            return res.status(201).json({ message: "No notifications found" });
        }
    });
};
module.exports =  {fetchUserDetails,fetchUsersPosts, fetchAllUserFromDB, fetchallPostsFromDB, fetchallStoriesFromDB, fetchallreelsFromDB,fetchNotification}