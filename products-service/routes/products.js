const Products = require('../controllers/product.controller');

module.exports = (router) => {
  router.post('/products/create', Products.createProduct);
  router.get('/products/get', Products.getProducts);
  router.get('/products/get/:name', Products.getProduct);
  router.put('/products/update/:id', Products.updateProduct);
  router.delete('/products/remove/:id', Products.removeProduct);
};
