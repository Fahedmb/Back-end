const mongoose = require('mongoose');


const subCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
}, { 

    timestamps: true 

});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);