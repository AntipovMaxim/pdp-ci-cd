import express from 'express';
import * as productsController from '../../controllers/products';

const router = express.Router();

router.post('/create', (req, res, next) => productsController.createProduct.execute(req, res, next));
router.get('/get', (req, res, next) => productsController.getProducts.execute(req, res, next));
router.put('/update/:id', (req, res, next) => productsController.updateProduct.execute(req, res, next));
router.delete('/remove/:id', (req, res, next) => productsController.deleteProduct.execute(req, res, next));

export default router;
