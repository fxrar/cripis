import { Router } from 'express';
import { createOrder } from '../controllers/orders.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createOrder);

export default router;
