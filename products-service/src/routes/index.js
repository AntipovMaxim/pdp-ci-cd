import express from 'express';
import apiRoutes from './api';
import { verifyToken } from '../middlewares'

const router = express.Router();


router.use('/api/v1', verifyToken, apiRoutes);

export default router;
