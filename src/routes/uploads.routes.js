const express = require("express");
const uploadController = require("../controllers/upload.controller");
const router = express.Router();
const verifyJWT =require("../middleware/verifyjwt.middleware")
const upload = require("../middleware/multer.middleware")
router.post("/posts",upload.single("file"),verifyJWT,uploadController.uploadPosts)
router.post("/reels",upload.single("file"),verifyJWT,uploadController.uploadReels)
router.post("/stories",upload.single("file"),verifyJWT,uploadController.uploadStories)

module.exports =router
