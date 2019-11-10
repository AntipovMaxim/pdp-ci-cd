import express from 'express';
const router = express.Router();
import apiRouter from './auth';


router.use('/api/v1', apiRouter);

export default router;
