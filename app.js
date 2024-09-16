
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();
const userRoutes =require("./src/routes/user.routes")
const updateRoutes= require("./src/routes/update.routes")
const fetchRoutes= require("./src/routes/fetch.routes")
const uploadRoutes= require("./src/routes/uploads.routes")
const sendRoutes= require("./src/routes/send.routes")
const verifyRoutes= require("./src/routes/verify.routes")
const postsRoutes= require("./src/routes/posts.routes")
const useridRoutes= require("./src/routes/userid.routes")
const chatsRoutes = require("./src/routes/chats.routes")
app.use("/user",userRoutes)
app.use("/update",updateRoutes)
app.use("/fetch",fetchRoutes)
app.use("/uploads",uploadRoutes)
app.use("/send/mail",sendRoutes)
app.use("/verify",verifyRoutes)
app.use("/posts",postsRoutes)
app.use("/userid",useridRoutes)
app.use("/chats",chatsRoutes)

module.exports = {app}