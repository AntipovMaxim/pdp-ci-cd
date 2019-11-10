const express = require('express');
const router = express.Router();

import authRouter from './routes';

router.use('/auth', authRouter);

export default router;
