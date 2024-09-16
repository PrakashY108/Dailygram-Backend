const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname
        // const url = file.fieldname + '-' + uniqueSuffix;
        const url = file.fieldname + file.originalname
        console.log("url is", url);
        cb(null, url)

    }
}
)

const upload = multer({ storage, })
module.exports = upload;
