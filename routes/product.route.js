module.exports = (app) => {
  const prdcontroller = require("../controllers/product.controller");
  var router = require("express").Router();

  router.get("/", prdcontroller.findAll);
  router.get("/:id", prdcontroller.findOne);
  router.post("/", prdcontroller.create);
  router.put("/:id", prdcontroller.update);
  router.delete("/:id", prdcontroller.delete);

  app.use("/api/products", router);
};
