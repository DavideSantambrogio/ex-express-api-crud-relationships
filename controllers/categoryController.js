const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Funzione per creare una nuova categoria nel database
const createCategory = async (name) => {
    try {
        // Utilizzo del metodo create del Prisma Client per creare una nuova categoria
        const category = await prisma.category.create({
            data: {
                name: name,
            },
        });
        // Log di conferma della creazione della categoria
        console.log('Categoria creata:', category);
        // Restituzione della categoria creata
        return category;
    } catch (error) {
        // Gestione degli errori in caso di fallimento della creazione
        console.error('Errore durante la creazione della categoria:', error);
        throw error;
    }
};

module.exports = { createCategory };
