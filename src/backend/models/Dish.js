let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = require('./User');

let dishSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    photo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    num_dishes: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["Vegetariano", "Vegano", "Normal"],
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    assessment: {
        type: Number,
        default: 0
    },
    num_ratings: {
        type: Number,
        default: 0
    },
    agent: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Dish', dishSchema);