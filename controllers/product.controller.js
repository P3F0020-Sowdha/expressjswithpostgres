const db = require("../models");
const Tbl = db.products;
const Op = db.Sequelize.Op;
const tableNameSingle = "Product";
const tableNamePlural = "Products";

exports.create = (req, res) => {
  const reqData = {
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  Tbl.create(reqData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while creating the ${tableNameSingle}.`,
      });
    });
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { product_id: id } : null;

  Tbl.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving ${tableNamePlural}.`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tbl.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving ${tableNameSingle} with id=${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Tbl.update(req.body, {
    where: { product_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `${tableNameSingle} was updated successfully.`,
        });
      } else {
        res.send({
          message: `Cannot update ${tableNameSingle} with id=${id}. Maybe ${tableNameSingle} was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating ${tableNameSingle} with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tbl.destroy({
    where: { product_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `${tableNameSingle} was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete ${tableNameSingle} with id=${id}. Maybe ${tableNameSingle} was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete ${tableNameSingle} with id=${id}`,
      });
    });
};
