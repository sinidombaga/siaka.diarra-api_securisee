
// Importation
const Sauce = require('../models/Sauce');
const fs = require('fs');

// Créer une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée'}))
        .catch(error => res.status(400).json({ error }));
};

// Modifier la sauce
exports.modifySauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (res.locals.userId == sauce.userId){
                const sauceObject = req.file ?
                { 
                    ...JSON.parse(req.body.sauce),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
                } : {...req.body };
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
            .catch(error => {

                res.status(400).json({ error });
            })
        }
    })
    console.log(res.locals.userId);
};

// Effacer la sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        if (res.locals.userId == sauce.userId) {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce supprimée'}))
                .catch(error => res.status(400).json({ error }));
            });
        }    
    })
    .catch(error => res.status(500).json({ error }));
};

// Choisir une sauce
exports.getOneSauce =  (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

// Choisir toutes les sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Mettre ou supprimer un like/dislike
exports.likeSauce = (req, res, next) => {
    
    // Ajout d'un like
    if (req.body.like === 1) {  
        Sauce.updateOne( {_id:req.params.id}, { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } })
        .then(() => res.status(200).json())
        .catch(error => res.status(400).json({ error }));
        
    // Ajout d'un dislike
    } else if (req.body.like === -1) { 
        Sauce.updateOne( {_id:req.params.id}, { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } })
        .then(() => res.status(200).json())
        .catch(error => res.status(400).json({ error }));

    // Enlever un Like ou un dislike      
    } else {  
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => { 
            
            // Enlever un like
            if (sauce.usersLiked.includes(req.body.userId)) {
                Sauce.updateOne( {_id:req.params.id}, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                .then(() => res.status(200).json())
                .catch(error => res.status(400).json({ error }))

            // Enlever un dislike
            } else if (sauce.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne( {_id:req.params.id}, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                .then(() => res.status(200).json())
                .catch(error => res.status(400).json({ error }))
            }
        })
        .catch(error => res.status(400).json({ error }));
    }
}

