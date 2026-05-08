// src/server.js

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import studentsRoutes from './routes/studentsRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

app.use(studentsRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// // Логування часу
// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });

// // Кореневий маршрут
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello, World!' });
// });

// // Маршрут для тестування middleware помилки
// app.get('/test-error', (req, res) => {
//   // Штучна помилка для прикладу
//   throw new Error('Something went wrong');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Middleware для парсингу JSON
// app.use(express.json());

// app.post('/users', (req, res) => {
//   console.log(req.body); // тепер тіло доступне як JS-об`єкт
//   res.status(201).json({ message: 'User created' });
// });
