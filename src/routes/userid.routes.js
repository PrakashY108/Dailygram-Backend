const express = require("express")
const router = express.Router()
const useridControllers = require("../controllers/userid.controllers")
const verifyJWT = require("../middleware/verifyjwt.middleware")
const { sendNotifications } = require("../middleware/sendNotifications.middleware")

router.post("/:followingtoid/follow",verifyJWT,useridControllers.follow,sendNotifications)
router.post("/:followingtoid/unfollow",verifyJWT,useridControllers.Unfollow)
module.exports = router;