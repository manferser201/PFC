let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
let Dish = require('../models/Dish');

/* POST de un nuevo plato */
router.post('/', 

    // Validaciones
    body('photo').exists().isString(),
    body('name').exists().isString(),
    body('ingredients').exists().isString(),
    body('num_dishes').exists().isNumeric(),
    body('price').exists().isDecimal(),
    body('type').exists().isString(),
    body('adress').exists().isString(),
    body('description').optional().isString(),
    body('assessment').optional().isNumeric(),
    body('num_ratings').optional().isNumeric(),
    body('agent').exists().isString(),

    (req, res) => {

        console.log("Entrando en el método post de platos");
        const errors = validationResult(req);
    
        if (!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()})
        }

        Dish.create({

            photo: req.body.photo,
            name: req.body.name,
            ingredients: req.body.ingredients,
            num_dishes: req.body.num_dishes,
            price: req.body.price,
            type: req.body.type,
            adress: req.body.adress,
            description: req.body.description,
            assessment: req.body.assessment,
            num_ratings: req.body.num_ratings,
            agent: req.body.agent

        }).then(dish => res.json(dish));
    }
);

/* GET de todos los platos */
router.get('/dishesList', function(req, res) {
    Dish.find().exec(function(err, dishes){
        if (err) res.status(500).send(err);
        else res.status(200).json(dishes);
    })
});

/* GET de los datos del vendedor de un plato concreto */
router.get('/', function(req, res) {
    Dish.findById({ "_id": req.body._id }).populate('agent').exec(function(err, dish){
        if (err) res.status(500).send(err);
        else res.status(200).json(dish.agent);
    })
});

/* PUT de un plato concreto */
router.put('/', function(req, res){
    Dish.findByIdAndUpdate({ "_id": req.body._id }, req.body, function(err, dishUpdate){
        if (err) res.status(500).send(err);
        else res.status(200).json(dishUpdate);
    });
});

/* DELETE de un plato concreto */
router.delete('/', function(req, res) {
    Dish.findByIdAndDelete({ "_id": req.body._id }, function(err){
        if (err) res.status(500).send(err);
        else res.status(200).send("Plato eliminado con éxito");
    });
});

module.exports = router;