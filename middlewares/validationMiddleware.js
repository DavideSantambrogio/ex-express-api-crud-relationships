const { validationResult } = require('express-validator');

// Middleware per la validazione dei dati
const validateData = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = validateData;
