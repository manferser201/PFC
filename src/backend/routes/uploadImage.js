const router = require('express').Router();
const storage = require('../controller/multer');
const multer = require('multer');

const controllerMulter = require('../controller/multer');

const uploader = multer({
    storage
}).single('file')

router.post('/', uploader,

    controllerMulter.uploadFile
);

// router.post('/upload', uploader, (req, res) => {
//     console.log('Entrando en el método para hacer el upload de las imagenes');

//     if(req.body) {
//         console.log("Entrando en el condicional");
//         res.status(200).json({mensage: "Imagen subida con exito"});
//     }
// });

module.exports = router;