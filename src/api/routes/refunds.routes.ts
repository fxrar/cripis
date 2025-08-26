import { Router } from 'express';
import { listRefunds } from '../controllers/refunds.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, listRefunds);

export default router;
