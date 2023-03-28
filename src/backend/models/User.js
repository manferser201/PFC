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
        type: Number
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
        type: String
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
        type: String
    },
    rol: {
        type: String,
        enum: ['admin', 'normal'],
        default: 'normal'
    }
});

module.exports = mongoose.model('User', userSchema);