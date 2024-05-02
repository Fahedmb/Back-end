const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
}, { 

    timestamps: true 

});


const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;