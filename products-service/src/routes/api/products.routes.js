import express from 'express';

import {
  CreateProductController,
  UpdateProductController,
  DeleteProductController,
  GetProductsController,
} from '../../controllers'

const router = express.Router();

router.post('/', (req, res, next) => new CreateProductController().execute(req, res, next));
router.get('/', (req, res, next) => new GetProductsController().execute(req, res, next));
router.put('/:id', (req, res, next) => new UpdateProductController().execute(req, res, next));
router.delete('/:id', (req, res, next) => new DeleteProductController().execute(req, res, next));

export default router;
