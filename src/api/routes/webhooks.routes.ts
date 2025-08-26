import { Router } from 'express';
import { cryptoapisWebhook } from '../controllers/webhooks.controller';

const router = Router();

router.post('/cryptoapis', cryptoapisWebhook);

export default router;
