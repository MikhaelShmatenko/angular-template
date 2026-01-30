var express = require("express");
var router = express.Router();
let ProductServices = require("../services/product-service");
let Product = require("../models/Product");

module.exports = router;

router.post("/addProduct", async function (req, res, next) {
  try {
    const product = new Product(
      req.body.name,
      req.body.type,
      Number(req.body.price),
      Boolean(req.body.exclusive),
      req.body.creator,
    );
    let productArray = await ProductServices.addProduct(product);
    res.json(productArray);
  } catch (err) {
    res.status(500).json({ error: "No se pudo introducir el producto" });
  }
});
router.get("/", async function (req, res, next) {
  try {
    let productsArray = await ProductServices.getProducts();
    res.json(productsArray);
  } catch (err) {
    res.status(500).json({ error: "No se pudo mostrar la lista de productos" });
  }
});
router.get("/:id", async function (req, res, next) {
  try {
    let { id } = req.params;
    let productArray = await ProductServices.getProductsById(id);
    res.json(productArray);
  } catch (err) {
    res.status(500).json({ error: "No se pudo mostrar el producto" });
  }
});
router.delete("/delete/:id", async function (req, res, next) {
  try {
    let { id } = req.params;
    await ProductServices.deleteProductsById(id);
    res.status(200).json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ error: "No se pudo mostrar el producto" });
  }
});
router.put("/modifyProduct/:id", async function (req, res, next) {
  try {
    let { id } = req.params;
    const product = new Product(
      req.body.name,
      req.body.type,
      Number(req.body.price),
      Boolean(req.body.exclusive),
    );
    await ProductServices.modifyProduct(product, id);
    res.status(200).json({ message: "Producto modificado" });
  } catch (err) {
    res.status(500).json({ error: "No se pudo introducir el producto" });
  }
});
