const prisma = require("../prisma");

const seed = async (numProducts = 25) => {

    const products = Array.from({ length: numProducts }, (_, i) => ({
        title: `Product ${i + 1}`,
        description: `This is a great product!`,
        price: 1 + Math.floor(Math.random() * 100),
    }));
    await prisma.product.createMany({ data: products })
};
seed()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });