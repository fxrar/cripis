import express from 'express';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import rateLimit from 'express-rate-limit';
import ordersRoutes from './api/routes/orders.routes';
import refundsRoutes from './api/routes/refunds.routes';
import webhooksRoutes from './api/routes/webhooks.routes';
import { errorHandler } from './api/middlewares/error.middleware';
import { initSentry } from './config/sentry';
import { idempotencyMiddleware } from './api/middlewares/idempotency.middleware';

const app = express();

initSentry();
app.use(Sentry.Handlers.requestHandler());

app.use(helmet());
app.use(express.json());
app.use(idempotencyMiddleware);
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

app.use('/v1/orders', ordersRoutes);
app.use('/v1/refunds', refundsRoutes);
app.use('/v1/webhooks', webhooksRoutes);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

export default app;
