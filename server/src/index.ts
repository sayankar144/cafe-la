import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import ordersRoutes from './routes/orders';
import menuRoutes from './routes/menu';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*', // In production, replace with frontend URL
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
    }
});

app.use(cors());
app.use(express.json());

// Pass io object to routes if needed, or handle events here
app.use((req, res, next) => {
    (req as any).io = io;
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/menu', menuRoutes);

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 4000;

// Add a simple health check route for Railway to verify it's up
app.get('/', (req, res) => {
    res.send('Cafe LA Backend API is running!');
});

// Explicitly bind to 0.0.0.0 for Railway / Docker environments
httpServer.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
