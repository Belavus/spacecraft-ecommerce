const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middlewares/errorMiddleware');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

// Custom middleware to handle not found routes
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Error handling middleware
app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const { errorHandler } = require('./middlewares/errorMiddleware');
//
// const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/products');
// const userRoutes = require('./routes/users');
// const cartRoutes = require('./routes/cart');
//
// dotenv.config();
//
// const app = express();
// const port = process.env.PORT || 5000;
//
// app.use(cors());
// app.use(express.json());
//
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.error('Error connecting to MongoDB', err);
// });
//
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/cart', cartRoutes);
//
// // Custom middleware to handle not found routes
// app.use((req, res, next) => {
//     const error = new Error(`Not Found - ${req.originalUrl}`);
//     res.status(404);
//     next(error);
// });
//
// // Error handling middleware
// app.use(errorHandler);
//
// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });
