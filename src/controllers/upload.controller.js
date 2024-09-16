const db = require("../config/databaseconnection");
const cloudinary = require("../config/cloudinaryconfig")

const uploadOnCloudinary = async (file) => {
    try {
        let uploadOptions = {}; // Default upload options

        // Determine file type based on mimetype
        if (file.mimetype.startsWith('image')) {
            // For images
            uploadOptions = {
                folder: 'images', // Specify the folder to upload images to
                // Add any additional upload options for images here
            };
        } else if (file.mimetype.startsWith('video/mp4')) {
            // For MP4 videos
            uploadOptions = {
                folder: 'videos', // Specify the folder to upload videos to
                resource_type: 'video', // Set resource type to 'video' for videos
                // Add any additional upload options for videos here
            };
        } else {
            throw new Error('Unsupported file type'); // Throw an error for unsupported file types
        }

        // Perform the upload using Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(file.path, uploadOptions);
        console.log("Cloudinary upload response:", cloudinaryResponse);
        return cloudinaryResponse;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};



const uploadPosts = async (req, res) => {
    const { file } = req;
    const { title, description } = req.body;
    console.log(req.user);
    const userid = await req.user.userid;
    console.log(req.user);
    console.log(title, description);
    console.log("User ID:", userid);
    console.log("File:", file);

    if (!file) {
        return res.status(400).json({ error: 'No file found' });
    }
    const response = await uploadOnCloudinary(file)
    console.log("response", response);
    const type = file.mimetype.startsWith('image') ? 'photo' : 'video';
    const url = response.secure_url;


    const uploadQuery = `INSERT INTO posts (userid, url, title, description,type) VALUES (?, ?, ?, ?,?)`;
    db.query(uploadQuery, [userid, url, title, description,type], (err, result) => {
        if (err) {
            console.error('Error while posting user:', err);
            return res.status(500).json({ error: 'Error while posting post' });
        }
        console.log('Posted successfully');
        res.status(201).json({ message: 'Posted successfully', url });
    });
}
const uploadProfilePhoto = async (req, res,next) => {
    const { file } = req;
    console.log(req.body);
    console.log("File:", file);

    if (!file) {
       next()
    }
    const response = await uploadOnCloudinary(file)
    console.log("response", response);
    const type = file.mimetype.startsWith('image') ? 'photo' : 'video';
    const url = response.secure_url;
    req.url = url
     next()
    };


const uploadReels = async (req, res) => {
    const { file } = req;
    const { title, description } = req.body;
    const userid = req.user.userid;
    console.log(req.user);
    console.log(title, description);
    console.log("User ID:", userid);
    console.log("File:", file);

    if (!file) {
        return res.status(400).json({ error: 'No file found' });
    }

    const response = await uploadOnCloudinary(file)
    console.log("response", response);
    const type = file.mimetype.startsWith('image') ? 'photo' : 'video';
    console.log(type);
    const url = response.secure_url;


    const uploadQuery = `INSERT INTO videos (userid, url, title, description,type) VALUES (?, ?, ?, ?,?)`;
    db.query(uploadQuery, [userid, url, title, description, type], (err, result) => {
        if (err) {
            console.error('Error while posting reel:', err);
            return res.status(500).json({ error: 'Error while posting reel' });
        }
        console.log('Reel posted successfully');
        res.status(201).json({ message: 'Reel posted successfully', url });
    });
}


const uploadStories = async (req, res) => {
    const { file } = req;
    const userid = req.user.userid;
    if (!file) {
        return res.status(400).json({ error: 'No file found' });
    }

    const response = await uploadOnCloudinary(file)
    console.log("response", response);
    const type = file.mimetype.startsWith('image') ? 'photo' : 'video';
    console.log(type);
    const url = response.secure_url;

    const uploadQuery = `INSERT INTO storiesuser (userid, url,type) VALUES (?, ?, ?)`;
    db.query(uploadQuery, [userid, url, type], (err, result) => {
        if (err) {
            console.error('Error while uploading story:', err);
            return res.status(500).json({ error: 'Error while posting story' });
        }
        console.log('story posted successfully');
        res.status(201).json({ message: 'Story posted successfully', url });
    });
}


module.exports = { uploadPosts ,uploadReels,uploadStories,uploadProfilePhoto}
