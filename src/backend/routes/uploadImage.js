const router = require('express').Router();
const Image = require('../models/Image');
const storage = require('../multer');
const multer = require('multer');

const uploader = multer({
    storage
}).single('file')

router.post('/upload', uploader, (req, res) => {
    console.log('Entrando en el método para hacer el upload de las imagenes');

    const { body, file } = req;

    if(file && body) {
        console.log("Entrando en el condicional");

        Image.create({
            fileName: req.body.name,
            fileUrl: `https://pfc-production.up.railway.app/${req.file.filename}`

        }).then(image => res.json(image));
    }
});

router.get('/', (req, res) => {
    Image.find().exec(function(err, images) {
        if (err) res.status(500).send(err);
        else res.status(200).json(images);
      });
});

module.exports = router;