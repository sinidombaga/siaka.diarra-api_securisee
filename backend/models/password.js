//Importation
const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

// Regex
passwordSchema
    .is().min(6)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()

// Exportation
module.exports = passwordSchema;