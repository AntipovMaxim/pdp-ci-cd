import express from 'express';
import apiRouter from './auth';

const router = express.Router();


router.use('/api/v1', apiRouter);

export default router;
