import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import { connectDb } from './ConnectDb.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: false }));

// CORS settings
app.use(cors({
  origin: ["http://localhost:5173", "https://my-product.vercel.app"],
  credentials: true,
}));


app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);


app.get('/', (req, res) => {
  res.send('Hello World! GFG TASK2 SERVER');
});

connectDb();

export default app;
