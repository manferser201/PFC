const router = require('express').Router();
const storage = require('../multer');
const multer = require('multer');
const controllerMulter = require('../multer')

const Image = require('../models/Image');

const uploader = multer({
    storage
}).single('file')

router.post('/upload', uploader, async (req, res) => {
    console.log('Entrando en el método para hacer el upload de las imagenes');
    
    const { body } = req;
    console.log("body", req.file);
    if(req.body) {
        // const newImage = new Image ({
        //     fileName: req.file.originalname,
        //     fileUrl: `${Date.now()}-${req.file.originalname}`
        // })
        
        // await newImage.save()
        console.log('url:', req.file.path)
        res.status(200).json({message: 'Todo correcto', fileUrl: `${req.file.path}`});
    }
});

router.get('/download', async (req, res) => {
    const images = await Image.find();
    res.json(images);
})

module.exports = router;