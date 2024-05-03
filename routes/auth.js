const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
//const nodemailer = require('nodemailer');

//register
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send("User registered successfully ");
    } catch (error) {
        res.status(400).send('Error: ' + error.message);
    }
});

//login
router.post('/login',async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).send('user not found')
        }
        const isPasswordMatch =await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(401).send('invalid password')
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
        const userResponse = {
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            phone: user.phone,
            email: user.email,
            role: user.role,
            occupation: user.occupation,
            bio: user.bio
        };
        console.log(userResponse);
        res.send({token:token, userResponse: userResponse})
    } catch (error) {
        res.status(400).send(error.message)
    }});

//logout
router.post('/logout',async (req,res)=>{
    try {
        res.send('User logged out')
    } catch (error) {
        res.status(500).send('Error: '+error.message)
    }
});

module.exports=router;