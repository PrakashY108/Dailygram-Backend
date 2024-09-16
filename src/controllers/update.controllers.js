const db= require("../config/databaseconnection")
const bcrypt = require("bcryptjs")

const UpdateUserDetails = (req, res) => {
    const userid = req.user[0].userid
    const { firstName, lastName, username, DOB, phoneNo, Bio } = req.body;
    let fetchQuery = `UPDATE user SET `;
    const queryParams = [];
    const setStatements = [];

    if (firstName) {
        setStatements.push(`firstname = ?`);
        queryParams.push(firstName);
    }
    if (lastName) {
        setStatements.push(`lastName = ?`);
        queryParams.push(lastName);
    }
    if (username) {
        setStatements.push(`username = ?`);
        queryParams.push(username);
    }
    if (DOB) {
        setStatements.push(`DOB = ?`);
        queryParams.push(DOB);
    }
    if (phoneNo) {
        setStatements.push(`phoneNo = ?`);
        queryParams.push(phoneNo);
    }
    if (Bio) {
        setStatements.push(`Bio = ?`);
        queryParams.push(Bio);
    }

    if (setStatements.length === 0) {
        return res.status(400).send("No fields to update provided.");
    }

    fetchQuery += setStatements.join(', ') + ` WHERE Userid = ${userid}`;

    db.query(fetchQuery, queryParams, (err, result) => {
        if (err) {
            console.log(fetchQuery);
            console.error("Error while updating data", err);
            res.status(500).send("Error while updating data");
        } else {
            console.log("Updated successfully!!!");
            res.status(200).send("Updated successfully!!!");
        }
    });

}
const UpdatePasword = (req, res) => {
    const userid = req.user[0].userid
    const { password, email } = req.body;
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    console.log("hash",hash);
    let fetchQuery = `UPDATE user SET password = ? WHERE email = ? `;
    db.query(fetchQuery, [hash, email], (err, result) => {
        if (err) {
            console.log(fetchQuery);
            console.error("Error while updating password", err);
            res.status(500).send("Error while updating password");
        } else {
            console.log("Password Updated successfully!!!");
            res.status(200).send("Password Updated successfully!!!");
        }
    });
}

module.exports= {UpdateUserDetails,UpdatePasword}