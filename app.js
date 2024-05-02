const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const certificateRoutes = require('./routes/certificate');
const courseRoutes = require('./routes/course');
const gradeRoutes = require('./routes/grades');
const requestRoutes = require('./routes/request');
const subCategoryRoutes = require('./routes/subCategory');
const userRoutes = require('./routes/user');

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch(err => {
    console.log(err);
})

app.get('/protected', (req, res) => {
    res.send('This is a protected route');
})

app.use('/auth',authRoutes);
app.use('/category',categoryRoutes);
app.use('/certificate',certificateRoutes);
app.use('/course',courseRoutes);
app.use('/grade',gradeRoutes);
app.use('/request',requestRoutes);
app.use('/subCategory',subCategoryRoutes);
app.use('/user',userRoutes);
