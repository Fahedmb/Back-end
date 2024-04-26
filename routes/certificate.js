const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Certificate = require('../models/certificate');

// Create a certificate
router.post('/certificate', authenticate, async (req, res) => {
    try {
        const certificate = new Certificate(req.body);
        await certificate.save();
        res.status(201).send(certificate);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all certificates
router.get('/certificate', authenticate, async (req, res) => {
    try {
        const certificates = await Certificate.find();
        res.send(certificates);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a certificate by id
router.patch('/certificate/:id', authenticate, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'price', 'category', 'subCategory'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!certificate) {
            return res.status(404).send();
        }
        res.send(certificate);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a certificate by id
router.delete('/certificate/:id', authenticate, async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndDelete(req.params.id);
        if (!certificate) {
            return res.status(404).send();
        }
        res.send(certificate);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;