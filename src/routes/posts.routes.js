const express= require("express")
const router = express.Router()
const postControllers = require("../controllers/posts.controllers")

router.post("/:postid/likes",postControllers.handlelike)
router.post("/:postid/shares",postControllers.handleshare)
router.post("/:postid/saves",postControllers.handlesaved)

module.exports = router;