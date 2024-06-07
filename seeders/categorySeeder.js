const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
    { name: 'Tecnologia' },
    { name: 'Viaggi' },
    { name: 'Cucina' }
];

async function main() {
    for (const category of categories) {
        await prisma.category.create({
            data: category
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
