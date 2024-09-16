const db = require("../config/databaseconnection")
const sendNotifications=async(req,res)=>{
    const status =await  req.data.status;
    const receiverid= await req.data.receiverid;
    const userid = await req.data.userid;
    const username = await req.data.username;
  const type= await req.data.type,
    postid = await  req.body.postid||null;
    console.log(userid,receiverid,type,status,postid);
    var message;
    var dbstatus=`SUCCESS`
    if(status ===`REQUESTED`){
        message=`${username} sent you Friend Request`
        dbstatus= "PENDING";
    }
    else{
        message=`${username} started following you`
    }
     const Query=`INSERT INTO notifications (userid,receivedbyid,message,status,type,postid) VALUES(?,?,?,?,?,?)`
 db.query(Query,[receiverid,userid,message,dbstatus,type,postid],(err,result)=>{
    if (err) {
        console.log("Error while saving notification", err);
        res.status(500).send({ message: "Error while saving notification" });}
    
    res.status(201).send("Notification sent successfully")  }
 )}
 module.exports = {sendNotifications};