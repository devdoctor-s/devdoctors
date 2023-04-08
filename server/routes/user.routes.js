const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single user by id
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// CREATE a new user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE an existing user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    if (req.body.isAdmin != null) {
        res.user.isAdmin = req.body.isAdmin;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an existing user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'Deleted User' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a single user by id
async function getUser(req, res, next) {
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

module.exports = router;
