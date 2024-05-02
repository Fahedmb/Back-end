const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    certificate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate',
        required: true
    },
    requestType: {
        type: String,
        required: true,
        enum: ['White_test', 'Voucher']
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected']
    },
}, {    
        timestamps: true
 
});

const Request = mongoose.model('Request', requestSchema);