const { body } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categoryValidation = {
    name: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Il nome è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Il nome deve essere una stringa.',
            bail: true
        },
        isLength: {
            options: { min: 3 },
            errorMessage: 'Il nome deve essere di almeno 3 caratteri.'
        }
    }
};

module.exports = {
    categoryValidation,
};
