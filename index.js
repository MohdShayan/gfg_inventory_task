import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js'
import { connectDb } from './ConnectDb.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: false }));

app.use(cors(
    {
        origin: ["http://localhost:5173","https://my-product.vercel.app"],
        credentials: true,
    }
));

const PORT = process.env.PORT || 5000;

app.use('/api/user', userRoutes);
app.use('/api/product',productRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!GFG TASK2 SERVER ');
});


app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});