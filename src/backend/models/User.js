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
        type: String
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
        enum: ['PayPal', 'Visa', 'Bizum']
    },
    photo: {
        type: String,
        default: ""
    },
    rol: {
        type: String,
        enum: ['admin', 'sub'],
        default: 'sub'
    }, 
    assessment: {
        type: Number,
        default: 0
    },
    num_ratings: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);