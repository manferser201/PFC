let express = require('express');
const session = require('express-session');
let router = express.Router();
let mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
let User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* POST de un nuevo usuario */
router.post('/', 
  
  // Validaciones
  body('username', "El nombre de usuario debe ser alfanumérico").exists().isAlphanumeric(),
  body('password', "La contraseña debe tener un mínimo de 8 caracteres").exists().isString().isLength({ min: 8 }),
  body('name', 'El campo nombre es obligatorio').exists().isString(),
  body('surname', 'El campo apellido es obligatorio').exists().isString(),
  body('identification', "Debe ser un documento de identificación válido (DNI / NIE)").exists().isAlphanumeric(),
  body('email', "Debe ser un Email").exists().isEmail(),
  body('phone_number').optional().isLength({ min: 9, max: 9 }),
  body('adress').optional().isString(),
  body('birthday', "Debe ser una fecha").exists().isDate(),
  body('pay').optional().isString(),
  body('photo').optional().isURL(),
  body('assessment').optional().isNumeric(),
  body('num_ratings').optional().isNumeric(),

  (req, res) => {
    console.log("Entrando en el método de la API");
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
      photo: req.body.photo

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


/* Login usuario */
router.post('/login', function(req, res, next) {
  
  console.log('Entrando en el método de Login');
  //Compruebe si el usuario existe
  User.findOne({ username: req.body.username }, function(err, user) {
    
    if(err) {
      return res.status(500).json({ error: 'Error interno del servisor' });
    }

    if(!user) {
      return res.status(401).json({ error: 'Nombre de usuario no encontrado' });
    }

    if(user.password !== req.body.password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' }); 
    }

    return res.status(200).json({ message: 'Autenticación exisota', id: user._id, rol: user.rol });
  });

});

module.exports = router;