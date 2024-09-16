const db = require("../config/databaseconnection");

const handlelike = (req, res) => {
    const postid = req.params.postid;
    const task = req.body.task
  console.log(postid,task);
    if (task === "like") {
        const updateQuery = `UPDATE posts SET likes = likes+1 WHERE postid =?`
        db.query(updateQuery, [postid], (err, result) => {
            if (err) {
                console.log("Error updating likes", err);
                return;
            }
            if (result) {
                console.log("hii");

            }
            console.log("liked");
            res.status(201).send("liked!!")

        })
    } else {
        const updateQuery = `UPDATE posts SET likes = likes-1 WHERE postid =?`
        db.query(updateQuery, [postid], (err, result) => {
            if (err) {
                console.log("Error updating likes", err);
                return;
            }
            if (result) {
                console.log("hii");

            }
            console.log("unliked");
            res.status(201).send("unliked!!")

        })

    }
}
const handleshare = (req, res) => {
    const postid = req.params.postid;
    const updateQuery = `UPDATE posts SET shares = shares +1 WHERE postid =?`
    db.query(updateQuery, [postid], (err, result) => {
        if (err) {
            console.log("Error while sharing", err);
            return;
        }
        console.log("updated shares");
        res.status(201).send("shared!!")

    })


}
const handlesaved = (req, res) => {
    const postid = req.params.postid;
    const task = req.body.task;
    if (task === "save") {
        const updateQuery = `UPDATE posts SET saved = saved +1 WHERE postid =?`
        db.query(updateQuery, [postid], (err, result) => {
            if (err) {
                console.log("Error updating share", err);
                return;
            }

            console.log("updated saved");
            res.status(201).send("saved!!")

        })
    } else {
        const updateQuery = `UPDATE posts SET saved = saved -1 WHERE postid =?`
        db.query(updateQuery, [postid], (err, result) => {
            if (err) {
                console.log("Error updating share", err);
                return;
            }

            console.log("updated save");
            res.status(201).send("unsaved!!")

        })

    }
}

module.exports = { handlelike, handlesaved, handleshare }