const express = require("express")
const router= express.Router();
const sendControllers = require("../controllers/send.controllers")
const fetchUser =require("../middleware/fetchuser.middleware");
const verifyJWT = require("../middleware/verifyjwt.middleware");

router.post("/welcome",sendControllers.sendWelcomeMail)
router.post("/otp",fetchUser,sendControllers.sendOTPMail)
router.post("/:receiverid/notification",verifyJWT,sendControllers.sendNotifications)
module.exports = router;