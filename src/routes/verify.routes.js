const express = require("express")
const router = express.Router()
const verifyControllers = require("../controllers/verify.controllers")
const verifyJWT = require("../middleware/verifyjwt.middleware")

router.post("/otp",verifyControllers.VerifyOTP)
router.post("/token",verifyJWT,verifyControllers.VerifiedJWT)
module.exports = router;