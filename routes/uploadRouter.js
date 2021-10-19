const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});


const imageFileFilter = (req, file, cb) =>{
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};
const upload = multer({storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.status = 403;
    res.end('GET  operation not supported on /imageUpload');
})
uploadRouter.route('/')
.post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
    res.status = 200;
    res.json(req.file);
})
uploadRouter.route('/')
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.status = 403;
    res.end('GET  operation not supported on /imageUpload');
})
uploadRouter.route('/')
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.status = 403;
    res.end('GET  operation not supported on /imageUpload');
})

module.exports = uploadRouter;