const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({

    grade: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {

    timestamps: true

});

const Grade = mongoose.model('Grade', gradeSchema);
module.exports = Grade;