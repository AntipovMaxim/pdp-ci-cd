import express from 'express';

import { register, login, getCurrentUser } from '../../controllers';
import { verifyToken } from '../../middlewares';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', verifyToken, getCurrentUser);

export default router;
