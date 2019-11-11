import { ProductsModel } from '../models/product.model';

export const createProduct = (req, res) => {
  const { name } = req.body;
  const product = { name };

  if (!name) {
    return res.status(412).json({ title: 'Validation Error', error: 'Name is required' });
  }

  ProductsModel.create(product, (err, createdProduct) => {
    if (err || !createdProduct) {
      return res.status(404).send('There is a problem with creating product')
    };

    return res.status(200).json(createdProduct);
  });
};

export const getProducts = (req, res) => {
  ProductsModel.get({}, (err, products) => {
    if (err) {
      return res.status(500).send('There was a problem finding the products.')
    };

    return res.status(200).json(products);
  });
};

export const updateProduct = (req, res) => {
  const { name } = req.body;
  const product = { name };

  if (!name) {
    return res.status(412).json({ title: 'Validation Error', error: 'Name is required' });
  }

  ProductsModel.update({ _id: req.params.id }, product, (err, updatedProduct) => {
    if (err || !updatedProduct) {
      return res.status(404).send('There is a problem with updating product')
    };

    return res.status(200).json(updatedProduct);
  });
};

export const removeProduct = (req, res) => {
  ProductsModel.delete({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send('There is a problem with deleting product')
    };

    res.status(201).send('Product deleted successfully');
  });
};
