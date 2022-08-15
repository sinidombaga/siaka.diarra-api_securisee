//importer
// Importation
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../models/User');
const passwordSchema = require ('../models/password');

// Inscription sur le site
exports.signup = (req, res, next) => {
    console.log(req.body.password);
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(401).json({message: 'Mot de passe invalide!'})
    }
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé!' }))
        .catch(error => {
            console.log(error);
            res.status(400).json({ error });
        })
    })
}

// connexion au site
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        console.log( req.body.email)
        if (!user) {
            return res.status(401).json({error: 'Utilisateur non trouvé!'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error: 'Mot de passe incorrect!' });
            }
            res.status(200).json({
                userId: user._id, 
                token: jwt.sign
                (
                    { userId: user._id },
                    process.env.JWT_JSONWEBTOKEN,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(501).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

