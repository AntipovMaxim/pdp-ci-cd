import authRouter from './routes';

const express = require('express');

const router = express.Router();

router.use('/auth', authRouter);

export default router;
