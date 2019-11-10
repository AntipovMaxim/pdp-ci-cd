import  express from 'express';
const router = express.Router();

import { register, login, getCurrentUser } from '../../controllers';
import { verifyToken } from '../../middlewares';

router.post('/register', register);
router.post('/login', login);
router.get('/current', verifyToken, getCurrentUser);

export default router;
