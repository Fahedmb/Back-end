const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Request = require('../models/request');

// Create a request
router.post('/request', authenticate, async (req, res) => {
    try {
        const request = new Request(req.body);
        await request.save();
        res.status(201).send(request);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all requests
router.get('/request', authenticate, async (req, res) => {
    try {
        const requests = await Request.find();
        res.send(requests);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a request by id
router.patch('/request/:id', authenticate, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['status'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!request) {
            return res.status(404).send();
        }
        res.send(request);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a request by id
router.delete('/request/:id', authenticate, async (req, res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id);
        if (!request) {
            return res.status(404).send();
        }
        res.send(request);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;