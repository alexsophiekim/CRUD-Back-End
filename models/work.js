const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    workName: String,
    workAuthor: String,
    workImg: String,
    authorURL: String
});

module.exports = mongoose.model('Work', workSchema);
