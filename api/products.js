const express = require("express");
const router = express.Router;
module.exports = router;

const prisma = require("../prisma")

router.get("/products", async (req, res, next) => {
    try {
        const products = await prisma.products.findMany();
        res.json(products);
    } catch (e) {
        next(e)
    }
});

router.get("/products/:id", async (req, res, next) => {
    const { id } = req.params;
    const includeOrders = req.user
        ? { where: { ownerId: req.user.id } }
        : false
    try {
        const product = await prisma.product.id.findUniqueOrThrow();
        res.json(product);
    } catch (e) {
        next(e);
    }

})
