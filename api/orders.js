const express = require("express");
const router = express.Router;
module.exports = router;

const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", authenticate, async (req, res, next) => {
    try {
        const orders = await prisma.order.findMany({
            where: { ownerId: req.user.id },
        });
        res.json(orders);
    } catch (e) {
        next(e);
    }
});

router.post("/", authenticate, async (req, res, next) => {
    const { date, note, productIds } = req.body;
    try {
        const products = productIds.map((id) => ({ id }));
        const order = await prisma.order.create({
            data: {
                date,
                note,
                ownerId: req.user.id,
                products: { connect: products }
            },
        });
        res.status(201).json(order)
    } catch (e) {
        nect(e);
    }
});

router.get("/orders/:id", authenticate, async (req, res, next) => {
    const { id } = req.params;
    try {
        const order = await prisma.order.findUniqueOrThrow({
            where: { id: +id },
            include: { products: true },
        });
        if (order.ownerId !== req.user.id) {
            next({ status: 403, message: "This is not your order." })
        }
        res.json(order);
    } catch (e) {
        next(e);
    }
});