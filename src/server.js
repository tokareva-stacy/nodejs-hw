import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import cookieParser from "cookie-parser";

import { connectMongoDB } from './db/connectMongoDB.js';

import { errors } from "celebrate";
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// --- Middleware ---
app.use(logger);
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);
app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// --- Routes ---
app.use(notesRoutes);
app.use(authRoutes);
// --- 404 ---
app.use(notFoundHandler);
// обробка помилок від celebrate (валідація)
app.use(errors());
// --- 500 ---
app.use(errorHandler);

await connectMongoDB();

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
