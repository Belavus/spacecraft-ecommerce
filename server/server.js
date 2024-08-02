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
const orderRoutes = require('./routes/order');
const adminRoutes = require('./routes/admin');
const homePageRoutes = require('./routes/homePage');
const User = require("./models/User");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Function to create an initial admin user
const createAdminUser = async () => {
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'Maksimka1!';
    const adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
        const user = await User.create({
            name: 'Admin User',
            email: adminEmail,
            password: adminPassword,
            isAdmin: true,
        });

        console.log('Admin user created:', user);
    }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('Connected to MongoDB');
    await createAdminUser(); // Create an initial admin user
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/homepage', homePageRoutes);

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
