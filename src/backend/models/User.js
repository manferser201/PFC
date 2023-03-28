let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    identification: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        default: null
    },
    adress: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    num_dishes_sold: {
        type: Number,
        default: 0
    },
    num_dishes_purchased: {
        type: Number,
        default: 0
    },
    pay: {
        type: String,
        enum: ['PayPal', 'Visa', 'Bizum'],
        required: true
    },
    photo: {
        type: String,
        default: ""
    },
    rol: {
        type: String,
        enum: ['admin', 'normal'],
        default: 'normal'
    }
});

// Encriptación de la contraseña
let bcrypt = require('bcryptjs');
let SALT_WORK_FACTOR = 10;

userSchema.pre('save', function (next) {
    
    let user = this;

    // Se aplica una función hash a la contraseña si esta ha sido modificada o es nueva
    if (!user.isModified('password ')) return next();
    
    // Genera la salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        
        if (err) return next(err);
        
        // Aplica una función hash a la contraseña usando la salt generada
        bcrypt.hash(user.password, salt, function (err, hash) {
            
            if (err) return next(err);
            
            // sobrescribe el password escrito con el “hasheado”
            user.password = hash;
            next();
        });
    });
});

// Comprueba que la contraseña introducida coincide con la guardada
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);