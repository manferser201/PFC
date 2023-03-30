let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
let User = require('../models/User');

/* POST de un nuevo usuario */
router.post('/', 
  
  // Validaciones
  body('username').exists().isAlphanumeric(),
  body('password', "La contraseña debe tener un mínimo de 8 caracteres").exists().isAlphanumeric().isLength({ min: 8 }),
  body('name').exists().isString(),
  body('surname').exists().isString(),
  body('identification', "Debe ser un documento de identificación válido (DNI / NIE)").exists().isAlphanumeric(),
  body('email', "Debe ser un Email").exists().isEmail(),
  body('phone_number').optional().isLength({ min: 9, max: 9 }),
  body('adress').exists().isString(),
  body('birthday', "Debe ser una fecha").exists().isDate(),
  body('pay').exists().isString(),
  body('photo').optional().isURL(),
  body('rol').optional().isString(),

  (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }

    // Creamos el JSON de usuario
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

/* GET del listado de todos los usuarios registrados*/
router.get('/', function (req, res) {
  User.find().exec(function(err, users) {
    if (err) res.status(500).send(err);
    else res.status(200).json(users);
  });
});

/* PUT para cambiar el rol de un usuario */
router.put('/', function(req, res) {
  User.findOneAndUpdate({'username': req.body.username}, req.body, function(err, userinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(userinfo);
  });
});

/* DELETE de un usuario concreto */
router.delete('/', function(req, res) {
  User.findOneAndDelete({'username': req.body.username}, function(err){
    if (err) res.status(500).send(err);
    else res.status(200).send("Usuario eliminado con éxito");
  })
});

module.exports = router;