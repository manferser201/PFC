const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});

exports.upload = upload.single('file');

exports.uploadFile = (req, res) => {
    
    console.log('Entrando en el metodo');
    
    if(err){
        res.json({message: err.message, error: err})
    } else {
        res.send({message: 'Imagen subida'})
    }
    
}