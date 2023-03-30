let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
let Dish = require('../models/Dish');

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

        }).then(user => res.json(user));
    }
);

module.exports = router;