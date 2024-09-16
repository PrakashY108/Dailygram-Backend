const db = require("../config/databaseconnection");

const VerifyOTP = (req, res) => {
    const { email, otp } = req.body;
    const userOtp = parseInt(otp)
    const fetchOTP = `SELECT otp FROM userotp WHERE email = ?`
    db.query(fetchOTP, [email], (err, result) => {
        try {
            if (err) {
                console.log("error while finding otp in db", err);
                return res.status(500).json({ error: "Error while finding OTP in database", details: err });
            }
            if (result.length > 0) {
                const data = result[(result.length - 1)]
                const OTP = data.otp;
                if (OTP === userOtp) {
                    res.status(201).json({ message: "Otp is correct!!!" })
                } else {
                    console.log("Otp found is incorrect");
                    res.status(400).send({ error: "Otp is incorrect" })
                }

            } else {
                console.log("No otp found");
                res.status(404).send({ error: "No otp found" })
            }
        } catch {
            console.log("No otp found");
            res.status(404).send({ error: "No data found" })

        }
    })

}

const VerifiedJWT =(req,res)=>{
    const user = req.user;
    console.log(user);
    res.status(201).json({message:"logged in data available",data:user})
}
module.exports = { VerifyOTP  ,VerifiedJWT}