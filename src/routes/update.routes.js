const express = require("express");
const router = express.Router();
const updateControllers = require("../controllers/update.controllers")
const verifyJWT = require("../middleware/verifyjwt.middleware")


router.post("/userdetails",verifyJWT,updateControllers.UpdateUserDetails)
router.post('/password',verifyJWT,updateControllers.UpdatePasword);

module.exports= router;