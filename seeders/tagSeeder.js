const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tags = [
    { name: 'JavaScript' },
    { name: 'Node.js' },
    { name: 'React' },
    { name: 'Viaggi' },
    { name: 'Cucina Italiana' },
    { name: 'Cucina Asiatica' }
];

async function main() {
    for (const tag of tags) {
        await prisma.tag.create({
            data: tag
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
