const express = require("express");
const  router=express.Router();
const chatsControllers = require("../controllers/chats.controllers")
const verifyJWT =require("../middleware/verifyjwt.middleware")

router.post("/save/:receiver_id",verifyJWT,chatsControllers.Savechats)
router.post("/fetch",verifyJWT,chatsControllers.fetchChats)

module.exports = router;
