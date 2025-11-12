import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const notesRouter = require('./routes/notesRoutes');

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

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// --- Routes ---
app.use(notesRoutes);

// --- 404 ---
app.use(notFoundHandler);

// --- 500 ---
app.use(errorHandler);

await connectMongoDB();

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
