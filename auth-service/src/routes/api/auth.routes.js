import express from 'express';

import {
  GetCurrentUserController,
  RegisterController,
  LoginController,
} from '../../controllers/auth';
import { verifyToken } from '../../middlewares';

const router = express.Router();

router.post('/register', (req, res, next) => new RegisterController().execute(req, res, next));
router.post('/login', (req, res, next) => new LoginController().execute(req, res, next));
router.get('/current', verifyToken, (req, res, next) => new GetCurrentUserController().execute(req, res, next));

export default router;
