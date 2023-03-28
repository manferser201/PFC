let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
let User = require('../models/User');

// POST de un nuevo usuario
router.post('/', 
  
  body('username')
    .exists()
    .isString(),
  body('password')
    .exists()
    .isAlphanumeric()
    .isLength( {min:8} ),
  body('name')
    .exists()
    .isString(),
  body('surname')
    .exists()
    .isString(),
  body('identification')
    .exists()
    .isAlphanumeric(),
  body('email')
    .exists()
    .isEmail(),
  body('phone_number')
    .optional()
    .isLength(9),
  body('adress')
    .exists()
    .isString(),
  body('birthday')
    .exists()
    .isDate(),
  body('pay')
    .exists()
    .isString(),
  body('photo')
    .optional()
    .isString(),
  body('rol')
    .optional()
    .isString(),

  (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }

    User.create({

      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname,
      identification: req.body.identification,
      email: req.body.email,
      phone_number: req.body.phone_number,
      adress: req.body.adress,
      birthday: req.body.birthday,
      description: req.body.description,
      num_dishes_sold: req.body.num_dishes_sold,
      num_dishes_purchased: req.body.num_dishes_purchased,
      pay: req.body.pay,
      photo: req.body.photo,
      rol: req.body.rol

    }).then(user => res.json(user));
  }
);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;