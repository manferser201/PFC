const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        console.log("file multer", file);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage:storage});

exports.upload = upload.single('file');

exports.uploadFile = (req, res) => {
    res.send({message: 'Imagen subida'})
}