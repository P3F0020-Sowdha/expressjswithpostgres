module.exports = (app) => {
  const prdcontroller = require("../controllers/product.controller");
  var router = require("express").Router();

  router.get("/", prdcontroller.getAllProducts);
  router.get("/:productId", prdcontroller.getAllProductsById);
  router.post("/", prdcontroller.createAllProducts);
  router.put("/:productId", prdcontroller.updateProductsById);
  router.delete("/:productId", prdcontroller.deleteProductsById);

  app.use("/api/products", router);
};
