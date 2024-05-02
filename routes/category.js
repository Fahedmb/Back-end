const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Category = require('../models/category');

// Create a category
router.post('/category', authenticate, async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json({ id: category._id, name: category.name });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all categories
router.get('/category', authenticate, async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a category by id
router.delete('/category/:id', authenticate, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;