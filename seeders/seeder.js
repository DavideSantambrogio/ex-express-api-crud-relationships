const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const slugify = require('slugify');

const prisma = new PrismaClient();

const seedDatabase = async () => {
    try {
        // Leggi i dati dal file JSON
        const jsonData = fs.readFileSync('data.json', 'utf8');
        const posts = JSON.parse(jsonData);

        // Inserisci i dati nel database
        for (const post of posts) {
            // Genera lo slug basato sul titolo del post
            const slug = slugify(post.title, { lower: true });

            // Aggiungi lo slug ai dati del post
            post.slug = slug;

            // Crea il post nel database
            await prisma.post.create({
                data: post,
            });
        }

        console.log('Database popolato con successo!');
    } catch (error) {
        console.error('Errore durante il popolamento del database:', error);
    } finally {
        // Chiudi la connessione al database
        await prisma.$disconnect();
    }
};

seedDatabase();
