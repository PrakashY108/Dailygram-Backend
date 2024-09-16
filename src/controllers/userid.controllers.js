const db = require("../config/databaseconnection")

const follow = async(req, res,next) => {
    const followerid = await  req.user.userid;
    const followingtoid = await req.params.followingtoid;
    console.log(req.params.followingtoid);
    console.log(followerid, followingtoid);

    let status = "FOLLOWING";
    const FetchQuery = `SELECT accounttype FROM user WHERE userid = ?`;
    db.query(FetchQuery, [followingtoid], (error, result) => {
        if (error) {
            console.log("Error fetching following", error);
            return res.status(500).send(error);
        }

        if (!result || result.length === 0) {
            console.log("No accounttype found for the followingid", followingtoid);
            return res.status(404).send("No account type found for the followingid");
        }
        console.log(result);
        const accesstype = result[0].accounttype;
        if (accesstype === 1) {
            status = "REQUESTED";
        }

        const Query = `INSERT INTO followtable (followingid, followerid, status) VALUES (?, ?, ?)`;
        db.query(Query, [followingtoid, followerid, status], (error, result) => {
            if (error) {
                console.log("Error while following", error);
                return res.status(500).send(error);
            }
            const data={
                status:status,
                receiverid:followingtoid,
                userid:followerid,
                type :"FRIENDREQUEST"
            }
            req.data=data;
            next()
        });
    });
};

const Unfollow = async (req, res) => {
    console.log("hhhhh");
    const followerid = await req.user.userid;
    const followingtoid = await req.params.followingtoid;
    console.log(followerid, followingtoid);
        const Query = `DELETE FROM followtable WHERE followerid =? && followingid=?`;
        db.query(Query, [ followerid,followingtoid], (error, result) => {
            if (error) {
                console.log("Error while unfollowing", error);
                return res.status(500).send(error);
            }
            res.status(201).send("Unfollowed");
        });
    }
module.exports={follow,Unfollow}
