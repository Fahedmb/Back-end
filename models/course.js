const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: true
    },
    certificate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate',
        required: true
    },
}, { 

    timestamps: true 

});

const Course = mongoose.model('Course', courseSchema);