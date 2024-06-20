const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Creare un nuovo tag
exports.createTag = async (req, res) => {
    const { name } = req.body;
    try {
        const tag = await prisma.tag.create({
            data: { name },
        });
        res.status(201).json(tag);
    } catch (error) {
        console.error('Errore durante la creazione del tag:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};

// Recuperare tutti i tags
exports.getTags = async (req, res) => {
    try {
        const tags = await prisma.tag.findMany();
        res.status(200).json(tags);
    } catch (error) {
        console.error('Errore durante il recupero dei tags:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};

// Recuperare un tag tramite il suo id
exports.getTagById = async (req, res) => {
    const { id } = req.params;
    try {
        const tag = await prisma.tag.findUnique({ where: { id: parseInt(id) } });
        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({ error: 'Tag non trovato' });
        }
    } catch (error) {
        console.error('Errore durante il recupero del tag per id:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};

// Aggiornare un tag tramite il suo id
exports.updateTagById = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const tag = await prisma.tag.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.status(200).json(tag);
    } catch (error) {
        console.error('Errore durante l\'aggiornamento del tag:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};

// Eliminare un tag tramite il suo id
exports.deleteTagById = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.tag.delete({ where: { id: parseInt(id) } });
        res.status(204).end();
    } catch (error) {
        console.error('Errore durante l\'eliminazione del tag:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};
