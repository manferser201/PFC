const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = new Schema({
    fileName: {type: String, require: true},
    fileUrl: {type: String}
})

module.exports = mongoose.model('Image', Image);