
// Importation
const jwt = require('jsonwebtoken');

// Exportation
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // Vérification du token avec la clé
        const decodedToken = jwt.verify(token, `${process.env.JWT_JSONWEBTOKEN}`);
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            // Si la vérification n'est pas valide on envoi une erreur
            throw 'User ID non valable !'
        } else {
            res.locals.userId = userId;
            next();
        }
    } catch (error) { console.log(error);
        // Renvoi une erreur 401 si l'authentification n'est pas bonne
        res.status(401).json({error: error | 'Requête non authentifiée!' });
    }
};

