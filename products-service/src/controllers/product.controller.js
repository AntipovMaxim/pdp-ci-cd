import { ProductsModel } from '../models/product.model';

export const createProduct = (req, res) => {
  const { name } = req.body;
  const product = { name, userId: req.userId };

  if (!name) {
    return res.status(412).json({ title: 'Validation Error', error: 'Name is required' });
  }

  return ProductsModel.create(product, (err, createdProduct) => {
    if (err || !createdProduct) {
      return res.status(404).send('There is a problem with creating product');
    }

    const response = { id: createdProduct._id, name: createdProduct.name };

    return res.status(200).json(response);
  });
};

export const getProducts = (req, res) => {
  ProductsModel.get({ userId: req.userId }, (err, products) => {
    if (err) {
      return res.status(500).send('There was a problem finding the products.');
    }

    const response = products.map((product) => ({ id: product._id, name: product.name }));

    return res.status(200).json(response);
  });
};

export const updateProduct = (req, res) => {
  const { name } = req.body;
  const product = { name };

  if (!name) {
    return res.status(412).json({ title: 'Validation Error', error: 'Name is required' });
  }

  return ProductsModel.update({ _id: req.params.id }, product, (err, updatedProduct) => {
    if (err || !updatedProduct) {
      return res.status(404).send('There is a problem with updating product');
    }

    const response = { id: updatedProduct._id, name: updatedProduct.name };

    return res.status(200).json(response);
  });
};

export const removeProduct = (req, res) => {
  ProductsModel.delete({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send('There is a problem with deleting product');
    }

    return res.status(201).json({ message: 'Product deleted successfully' });
  });
};
