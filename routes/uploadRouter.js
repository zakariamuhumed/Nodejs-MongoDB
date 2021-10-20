const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');



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
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.status = 403;
    res.end('GET  operation not supported on /imageUpload');
})
uploadRouter.route('/')
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
    res.status = 200;
    res.json(req.file);
})
uploadRouter.route('/')
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.status = 403;
    res.end('GET  operation not supported on /imageUpload');
})
uploadRouter.route('/')
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.status = 403;
    res.end('GET  operation not supported on /imageUpload');
})

module.exports = uploadRouter;