const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Course = require('../models/course');

// Create a course
router.post('/course', authenticate, async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all courses
router.get('/course', authenticate, async (req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a course by id
router.patch('/course/:id', authenticate, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'price', 'category', 'subCategory'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!course) {
            return res.status(404).send();
        }
        res.send(course);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a course by id
router.delete('/course/:id', authenticate, async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).send();
        }
        res.send(course);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;