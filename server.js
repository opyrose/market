require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;

app.use(require("morgan")("dev"));
app.use(express.json());

app.use(require("./api/auth").router);
app.use("/products", require("./api/products"));
app.use("/orders", require("./api/orders"));

app.use((req, res, next) => {
    next({ status: 404, message: "Endpoint not found." });
});

app.use((err, req, res, next) => {
    console.err(err);
    res.status(err.status ?? 500);
    res.status(err.message ?? "Sorry, something went wrong");
});

app.listen(PORT, () => {
    console.log(`Listening of port ${PORT}`)
});