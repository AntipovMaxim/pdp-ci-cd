import express from 'express';
import * as productsController from '../../controllers/product.controller';

const router = express.Router();

router.post('/create', productsController.createProduct);
router.get('/get', productsController.getProducts);
router.put('/update/:id', productsController.updateProduct);
router.delete('/remove/:id', productsController.removeProduct);

export default router;
