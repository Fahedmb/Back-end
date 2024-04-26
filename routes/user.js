const express = require('express')
const authenticate = require('../middleware/authenticate');
const User = require('../models/user');
const router = express.Router()


//User CRUD

//get user
router.get('/users',authenticate, async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

//get user by id
router.get('/users/:id',authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

// modify user
router.patch('/users/:id', authenticate, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'fullname','phone', 'email', 'role', 'occupation', 'bio'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send('Invalid updates');
    }
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        updates.forEach(update => {
            user[update] = req.body[update];
            user.markModified(update); // Add this line
        });
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send('Error: ' + error.message);
    }
});

//delete user
router.delete('/users/:id',authenticate, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

module.exports = router;