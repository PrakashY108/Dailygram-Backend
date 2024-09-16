const jwt = require("jsonwebtoken");
const db = require("../config/databaseconnection");

const verifyJWT = async (req, res, next) => {
    console.log(req.body);
    let token =req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "") || req.body.accessToken;
    // let token = req.body.accessToken || req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log("token", token);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized request: No token provided" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);
        const userid = await decodedToken.userid
        console.log(userid);
        if (!userid) {
            return res.status(401).json({ message: "Unauthorized request: No userid found in token" });
        }

        const fetchQuery = `SELECT * FROM user WHERE userid = ?`;
        db.query(fetchQuery, [userid], (error, result) => {
            if (error) {
                res.status(500).json({ message: "Internal Server Error", error });
                console.log("errrf", error);
            }

            if (result.length === 0) {
                return res.status(401).json({ message: "Unauthorized request: User not found" });
            }

            const user = result[0];
            if (user.accessToken !== token) {
                return res.status(401).json({ message: "Unauthorized request: Invalid token" });
            }

            // Deleting sensitive information
            delete user.password;
            delete user.accessToken;
            req.user = user;
            console.log("Alright in jwtverify");
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized request: Invalid token", error });
    }
};

module.exports = verifyJWT;
