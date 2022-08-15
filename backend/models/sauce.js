//importer mongoose

const mongoose = require('mongoose');

// Schéma
const sauceSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    mainPepper: { type: String, required: true },
    manufacturer: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

// Exportation
module.exports = mongoose.model('Sauce', sauceSchema);
