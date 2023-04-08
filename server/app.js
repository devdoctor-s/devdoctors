// @ts-nocheck
// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const stripe = require('stripe')('sk_test_...');
const http = require('http');
const socketIo = require('socket.io');
const rateLimit = require('express-rate-limit');

// Set up express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(function (req, res, next) {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    next();
});

app.use((req, res, next) => {
    const nonce = crypto.randomBytes(16).toString('base64');
    res.setHeader(
        'Content-Security-Policy',
        `default-src 'self'; script-src 'self' 'nonce-${nonce}';`,
    );
    res.locals.nonce = nonce;
    next();
});

// Set up rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again in 15 minutes',
});

// Apply rate limiting middleware to all requests
app.use(limiter);

// Set up MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern-stack', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Define mongoose schema for user
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

// Define mongoose model for user
const User = mongoose.model('User', userSchema);

// Define API routes
app.post('/api/users/register', async (req, res) => {
    try {
        // Hash password using bcryptjs
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save new user to MongoDB
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, 'secret', {
            expiresIn: '7d',
        });

        // Set token as cookie and send response
        res.cookie('token', token, { httpOnly: true });
        res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.post('/api/users/login', async (req, res) => {
    try {
        // Find user by email in MongoDB
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        // Verify password using bcryptjs
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password,
        );
        if (!isPasswordValid) {
            return res.status(400).send('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'secret', {
            expiresIn: '7d',
        });

        // Set token as cookie and send response
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.post('/api/users/logout', (req, res) => {
    // Clear token cookie and send response
    res.clearCookie('token');
    res.status(200).send('Logged out successfully');
});

// Define middleware function for verifying JWT token
const authenticate = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;

        // Verify token using jwt.verify
        const decodedToken = jwt.verify(token, 'secret');

        // Find user by decoded user ID and add to request object
        const user = await User.findById(decodedToken.userId).select(
            '-password',
        );
        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('Unauthorized');
    }
};

// Define API route for fetching user profile
app.get('/api/users/profile', authenticate, (req, res) => {
    res.status(200).send(req.user);
});

// Define API route for fetching all users
app.get('/api/users', authenticate, async (req, res) => {
    try {
        // Fetch all users from MongoDB
        const users = await User.find({}).select('-password');
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Define API route for deleting user by ID
app.delete('/api/users/:id', authenticate, async (req, res) => {
    try {
        // Find user by ID and delete from MongoDB
        const user = await User.findByIdAndDelete(req.params.id).select(
            '-password',
        );
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Define API route for creating new product
app.post('/api/products', authenticate, async (req, res) => {
    try {
        // Create new product
        const newProduct = await Product.create(req.body);
        res.status(201).send(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Define API route for fetching all products
app.get('/api/products', async (req, res) => {
    try {
        // Fetch all products from MongoDB
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Define API route for fetching product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        // Find product by ID in MongoDB
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Define API route for updating product by ID
app.put('/api/products/:id', authenticate, async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndUpdate(productId, req.body, {
            new: true,
        });

        // Send updated product as response
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Define API route for deleting product by ID
app.delete('/api/products/:id', authenticate, async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        // Send success message as response
        res.status(200).send('Product deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Define API route for creating payment intent
app.post('/api/payment', authenticate, async (req, res) => {
    try {
        // Get total amount from request body
        const { amount } = req.body;
        // Create payment intent using Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
        });

        // Send client secret as response
        res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Set up server to listen on specified port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
