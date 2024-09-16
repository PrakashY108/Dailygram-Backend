const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers")
const fetchUser = require("../middleware/fetchuser.middleware")
const fetchUserExistance = require("../middleware/fetchUserExistance.middleware");
const upload = require("../middleware/multer.middleware");



 router.post("/createUser",fetchUserExistance,userControllers.createUser)
// router.post("/createUser",userControllers.createUser)
router.post("/login",fetchUser,userControllers.loginUser)


module.exports= router;