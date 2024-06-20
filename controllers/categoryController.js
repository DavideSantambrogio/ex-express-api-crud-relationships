const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Creare una nuova categoria
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await prisma.category.create({
            data: { name },
        });
        res.status(201).json(category);
    } catch (error) {
        console.error('Errore durante la creazione della categoria:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};

// Recuperare tutte le categorie
exports.getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Errore durante il recupero delle categorie:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};

// Recuperare una categoria tramite il suo id
exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Categoria non trovata' });
        }
    } catch (error) {
        console.error('Errore durante il recupero della categoria per id:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};

// Aggiornare una categoria tramite il suo id
exports.updateCategoryById = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.status(200).json(category);
    } catch (error) {
        console.error('Errore durante l\'aggiornamento della categoria:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};

// Eliminare una categoria tramite il suo id
exports.deleteCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.category.delete({ where: { id: parseInt(id) } });
        res.status(204).end();
    } catch (error) {
        console.error('Errore durante l\'eliminazione della categoria:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};
