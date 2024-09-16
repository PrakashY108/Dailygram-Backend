const {app} = require("./app")
const dotenv = require('dotenv');
dotenv.config();
const db = require("./src/config/databaseconnection")
const PORT = process.env.PORT || 6000;

db.connect((error) => {
    if (error) {
        throw console.log("error while connecting", error);
    } else {
        console.log("mysql db connected successfully");
    }
});

app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`);
});
