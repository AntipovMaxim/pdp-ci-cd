const Products = require('../dao/product.dao');

exports.createProduct = (req, res) => {
  const { name } = req.body;
  const product = { name };

  Products.create(product, (err, createdProduct) => {
    const response = err ? { error: err } : createdProduct;
    res.json(response);
  });
};

exports.getProducts = (req, res) => {
  Products.get({}, (err, products) => {
    const response = err ? { error: err } : products;
    res.json(response);
  });
};

exports.getProduct = (req, res) => {
  Products.get({ name: req.params.name }, (err, products) => {
    const response = err ? { error: err } : products;
    res.json(response);
  });
};

exports.updateProduct = (req, res) => {
  const { name } = req.body;
  const product = { name };

  Products.update({ _id: req.params.id }, product, (err, updatedProduct) => {
    const response = err ? { error: err } : updatedProduct;
    res.json(response);
  });
};

exports.removeProduct = (req, res) => {
  Products.delete({ _id: req.params.id }, (err) => {
    const response = err ? { error: err } : { message: 'Product deleted successfully' };
    res.json(response);
  });
};
