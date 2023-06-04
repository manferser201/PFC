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
  body('username').exists().isAlphanumeric(),
  body('password', "La contraseña debe tener un mínimo de 8 caracteres").exists().isAlphanumeric().isLength({ min: 8 }),
  body('name').exists().isString(),
  body('surname').exists().isString(),
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
router.get('/userList', function (req, res) {
  User.find().exec(function(err, users) {
    if (err) res.status(500).send(err);
    else res.status(200).json(users);
  });
});

/* GET de un usuario concreto */
router.get('/', function(req, res) {
  User.findOne({'username': req.body.username}, function(err, userinfo){
    if (err) res.status(500).send(err);
    else res.status(200).json(userinfo);
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
  
  //Compruebe si el usuario existe
  User.findOne({ usuario: req.body.usuario }, function(err, user) {
    if (err) res.status(500).send('¡Error comprobando el usuario!');
    // Si el usuario existe...
    if (user != null) {
      user.comparePassword(req.body.password, function(err, isMatch) {
      if (err) return next(err);
  
      // Si el password es correcto...
      if (isMatch)
        res.status(200).send({ message: 'ok'});
      else
        res.status(200).send({ message: 'la password nocoincide' });
      });
    } else res.status(401).send({ message: 'usuario no registrado'});
  });
});

module.exports = router;