const { body } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const postValidation = {
    title: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Il titolo è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Il titolo deve essere una stringa.',
            bail: true
        },
        isLength: {
            options: { min: 3 },
            errorMessage: 'Il titolo deve essere di almeno 3 caratteri.'
        }
    },
    content: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Il contenuto è un campo obbligatorio.',
            bail: true
        }
    },
    published: {
        in: ['body'],
        isBoolean: {
            errorMessage: 'Il campo "published" deve essere un booleano.'
        }
    },
    categoryId: {
        in: ['body'],
        isInt: {
            errorMessage: 'Il campo "categoryId" deve essere un numero intero.',
            bail: true
        },
        custom: {
            options: async (value, { req }) => {
                const categoryId = parseInt(value);
                const category = await prisma.category.findUnique({ where: { id: categoryId } });
                if (!category) {
                    throw new Error(`Non esiste una categoria con id ${categoryId}.`);
                }
                return true;
            }
        }
    },
    // Aggiungi ulteriori validazioni se necessario per altri campi come 'image' e 'tags'
};

module.exports = {
    postValidation,
};
