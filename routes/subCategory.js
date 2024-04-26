const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const SubCategory = require('../models/subCategory');

// Create a subCategory
router.post('/subCategory', authenticate, async (req, res) => {
    try {
        const subCategory = new SubCategory(req.body);
        await subCategory.save();
        res.status(201).send(subCategory);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all subCategories
router.get('/subCategory', authenticate, async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.send(subCategories);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a subCategory by id
router.delete('/subCategory/:id', authenticate, async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (!subCategory) {
            return res.status(404).send();
        }
        res.send(subCategory);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
