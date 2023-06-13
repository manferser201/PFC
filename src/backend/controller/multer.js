const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});

exports.upload = upload.single('file');

exports.uploadFile = (req, res) => {
    res.status(200).json({mensage: "Imagen subida con exito"});
}