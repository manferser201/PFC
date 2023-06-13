const router = require('express').Router();
const storage = require('../multer');
const multer = require('multer');

const uploader = multer({
    storage
}).single('file')

router.post('/upload', uploader, (req, res) => {
    console.log('Entrando en el método para hacer el upload de las imagenes');

    if(req.body) {
        console.log("Entrando en el condicional");
        
    }
});

module.exports = router;