const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/image'));
    },
    filename: (req, file, cb) => {
        console.log('file',file);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage:storage});

exports.Upload = [upload.single('file'), ]

exports.uploadFile = (req, res) => {
    res.status(200).json({message: 'Upload hecho', fileName: this.Upload.filename})
}