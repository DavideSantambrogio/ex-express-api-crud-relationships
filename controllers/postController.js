const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify'); // Assicurati di importare slugify correttamente
const prisma = new PrismaClient();

// Funzione per generare uno slug unico
const generateUniqueSlug = async (title) => {
    let slug = slugify(title, { lower: true, strict: true });
    let uniqueSlug = slug;
    let count = 1;

    // Verifica l'esistenza dello slug
    while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${count}`;
        count++;
    }

    return uniqueSlug;
};

// Creare un nuovo post
exports.createPost = async (req, res) => {
    const { title, image, content, published, categoryId, tagIds } = req.body;
    try {
        const slug = await generateUniqueSlug(title);

        const tagIdsArray = Array.isArray(tagIds) ? tagIds : [];

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                image,
                content,
                published,
                ...(categoryId && { category: { connect: { id: categoryId } } }),
                tags: {
                    connect: tagIdsArray.map(id => ({ id }))
                }
            },
            include: {
                category: true,
                tags: true
            }
        });
        res.status(201).json(post);
    } catch (error) {
        console.error('Errore durante la creazione del post:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto', dettagli: error.message });
    }
};


// Recuperare tutti i post con opzione di filtro per pubblicati e non pubblicati
exports.getPosts = async (req, res) => {
    try {
        const where = {};
        const { published, page = 1, pageSize = 10, searchTerm } = req.query;

        if (published !== undefined) {
            where.published = published === 'true';
        }

        const offset = (page - 1) * pageSize;
        const totalItems = await prisma.post.count({ where });
        const totalPages = Math.ceil(totalItems / pageSize);

        if (page > totalPages) {
            throw new Error('La pagina richiesta non esiste.');
        }

        const posts = await prisma.post.findMany({
            where,
            include: {
                category: true,
                tags: true
            },
            take: parseInt(pageSize),
            skip: parseInt(offset)
        });

        res.json({
            data: posts,
            page: page,
            totalItems: totalItems,
            totalPages: totalPages
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Recuperare un post tramite il suo slug
exports.getPostBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                category: true,
                tags: true
            }
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post non trovato' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};

// Aggiornare un post tramite slug
exports.updatePostBySlug = async (req, res) => {
    const { slug } = req.params;
    const { title, image, content, published, categoryId, tagIds } = req.body;
    try {
        const newSlug = await generateUniqueSlug(title);
        const tagIdsArray = Array.isArray(tagIds) ? tagIds : [];

        const updatedPost = await prisma.post.update({
            where: { slug },
            data: {
                title,
                slug: newSlug,
                image,
                content,
                published,
                category: categoryId ? { connect: { id: categoryId } } : undefined,
                tags: {
                    set: tagIdsArray.map(id => ({ id }))
                }
            },
            include: {
                category: true,
                tags: true
            }
        });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};

// Eliminare un post tramite ID
exports.deletePostById = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.post.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).end();
    } catch (error) {
        console.error('Errore durante l\'eliminazione del post:', error);
        res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
};
