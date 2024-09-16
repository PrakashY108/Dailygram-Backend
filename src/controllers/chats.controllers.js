const db = require("../config/databaseconnection")

const Savechats = (req, res) => {
    const sender_id = req.user.userid
    const message = req.body.message
    const receiver_id = req.params.receiver_id
    console.log(sender_id,receiver_id,message);

    const InsertQuery =`INSERT INTO chats (sender_id,receiver_id,message) VALUES (?,?,?)`
    db.query(InsertQuery,[sender_id,receiver_id,message],(err,result)=>{
        if(err){
            console.log("error while sending chats:",err);
            res.send("error while saving chats in db")
            
        }
        res.status(200).send("chats saved successfully")
    })
}
const fetchChats =(req,res)=>{
    const userid = req.user.userid;
    console.log(req.user);
    
    console.log(req.body.data);
    
    const receiver_id = req.body.receiver_id
    console.log("details",receiver_id,userid);
    
    const fetchquery = `SELECT * FROM chats WHERE (sender_id = ${userid} AND receiver_id = ${receiver_id}) OR (sender_id = ${receiver_id} AND receiver_id = ${userid}) ORDER BY created_at DESC`;



    db.query(fetchquery,(err,result)=>{
        if (err){
            console.log("error while fetching chats:",err);
            res.status(201).send("error while fetching chats in db",err)
        }
        if(result.length>0){
            res.status(200).json({result,userid})
        }else{
            res.status(201).send("No chats found")
        }

    })

}
module.exports = { Savechats,fetchChats }