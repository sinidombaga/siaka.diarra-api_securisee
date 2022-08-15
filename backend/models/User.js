//importer mongoose

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schéma
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    
});

userSchema.plugin(uniqueValidator);

// Exportation
module.exports = mongoose.model('User', userSchema);


