const nodemailer = require("nodemailer");
const db = require("../config/databaseconnection");
const otp = require('otp-generator');

// Function to send welcome mail
const sendWelcomeMail = async (req, res) => {
    const { email } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASS
        }
    });
    const mailOptions = {
        from: "Dailygram",
        to: email,
        subject: "Welcome",
        html: "<b>Welcome to Dailygram</b><h2>Thankyou for registering with us. </b></h2>"
    };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log("Error while sending mail", err);
                    res.status(500).send({ message: "Error while sending mail" });
                    return;
                }
                console.log("Email sent successfully. Please check inbox");
                console.log(info);
                res.status(201).json({ message: "Mail sent", info });
            });
        }
    
        
const sendOTPMail = (req, res) => {
    const { email } = req.body;
  const userid=req.user.userid;

    // deleting all earlier otp 
    const otpDeleteQuery = `DELETE FROM userotp WHERE createdAt < (NOW() - INTERVAL 10 MINUTE)`
    db.query(otpDeleteQuery, (err) => {
        if (err) {
            console.log("Error while deleting otp", err);
        }
        console.log("all earlier otp deleted");
    })

    const OTP = otp.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, specialChars: false })

    const transporterOTP = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASS
        }
    });

    const mailOptionsOTP = {
        from: "Dailygram",
        to: email,
        subject: " To Reset your password",
        html: `<h1> Dailygram</h1><h2>Your OTP(One Time Password) is <b>${OTP}</b>.</h2></br><h3>Valid for 10 minutes.</h3>
    <h2> Donot share with anyone it can be used to reset your password.</h2>`
    };

    const fetchUser = 'SELECT * FROM user WHERE email = ?';
    db.query(fetchUser, [email], (err, result) => {
        if (err) {
            console.error('Error while fetching user:', err);
            res.status(500).send('Error fetching user');
            return;
        }

        if (result.length > 0) {
            const user = result[0]
            console.log(user);
            // adding otp to database
            const dbQueryOtp = `INSERT INTO userotp (userid,email,otp) VALUES (?,?,?)`
            const userId = user.userId
            db.query(dbQueryOtp, [userid, email, OTP], (err, result) => {
                if (err) {
                    console.error("Error while saving otp in database", err);
                    return res.status(500).json({ error: "Error while saving otp in database", details: err });
                }
                console.log("OTP saved in database successfully");
            })
            transporterOTP.sendMail(mailOptionsOTP, (err, info) => {
                if (err) {
                    console.log("Error while sending mail", err);
                    res.status(500).send({ message: "Error while sending mail" });
                    return;
                }
                console.log("Email sent successfully. Please check inbox");
                console.log(info);
                res.status(201).json({ message: "Mail sent", info });
            });
        }
    })
};

const sendNotifications=async(req,res)=>{
    const receiverid= await req.params.receiverid;
    const userid = await req.user.userid;
    const message= req.body.message
    const type= req.body.type
    postid = req.body.postid||null;
    console.log(userid,receiverid);
     const Query=`INSERT INTO notifications (userid,receivedbyid,message,type,postid) VALUES(?,?,?,?,?)`
 db.query(Query,[receiverid,userid,message,type,postid],(err,result)=>{
    if (err) {
        console.log("Error while saving notification", err);
        res.status(500).send({ message: "Error while saving notification" });}
    
    res.status(201).send("Notification sent successfully")  }
 )}

module.exports = {sendWelcomeMail,sendOTPMail,sendNotifications};
