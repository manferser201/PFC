const multer = require('multer');
const path = require('path');
const Image = require('./models/Image')
const { uuid } = require('uuidv4');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        console.log(uuid());
        cb(null, uuid() + path.extname(file.originalname));
    }
});

module.exports = storage;