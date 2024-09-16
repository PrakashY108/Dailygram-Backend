const express = require("express")
const router = express.Router()
const fetchControllers= require("../controllers/fetch.controllers")
const verifyJWT =require("../middleware/verifyjwt.middleware")

router.post("/user/details",verifyJWT,fetchControllers.fetchUserDetails)
router.post("/userspost",verifyJWT,fetchControllers.fetchUsersPosts)
router.post("/users",verifyJWT,fetchControllers.fetchAllUserFromDB)
router.post("/notifications",verifyJWT,fetchControllers.fetchNotification)
router.post("/allposts",verifyJWT,fetchControllers.fetchallPostsFromDB)
router.post("/allstories",verifyJWT,fetchControllers.fetchallStoriesFromDB)
router.post("/allreels",verifyJWT,fetchControllers.fetchallreelsFromDB)


module.exports = router;