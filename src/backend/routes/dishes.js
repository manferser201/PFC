let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
let Dish = require('../models/Dish');

/* POST de un nuevo plato */
router.post('/', 


    (req, res) => {

        Dish.create({

            photo: req.body.photo,
            name: req.body.name,
            ingredients: req.body.ingredients,
            num_dishes: req.body.num_dishes,
            price: req.body.price,
            type: req.body.type,
            adress: req.body.adress,
            assessment: req.body.assessment,
            num_ratings: req.body.num_ratings,
            agent: req.body.agent

        }).then(dish => res.json(dish));
    }
);

/* GET de todos los platos */
router.get('/dishesList', function(req, res) {
    Dish.find().exec(function(err, dishInfo){
        if (err) res.status(500).send(err);
        else res.status(200).json(dishInfo);
    })
});

/* GET de los datos del vendedor de un plato concreto */


/* PUT de un plato concreto */


/* DELETE de un plato concreto */


module.exports = router;