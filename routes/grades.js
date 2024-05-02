const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Grade = require('../models/grades');

// Create a grade
router.post('/grade', authenticate, async (req, res) => {
    try {
        const grade = new Grade(req.body);
        await grade.save();
        res.status(201).send(grade);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all grades
router.get('/grade', authenticate, async (req, res) => {
    try {
        const grades = await Grade.find();
        res.send(grades);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a grade by id
router.patch('/grade/:id', authenticate, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'price', 'category', 'subCategory'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!grade) {
            return res.status(404).send();
        }
        res.send(grade);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a grade by id
router.delete('/grade/:id', authenticate, async (req, res) => {
    try {
        const grade = await Grade.findByIdAndDelete(req.params.id);
        if (!grade) {
            return res.status(404).send();
        }
        res.send(grade);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;