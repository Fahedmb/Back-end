const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

//register
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        
        // Generate a token for the user (you may need to implement this logic)
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
        
        // Send a JSON response with the token and user data
        res.status(201).json({ token: token, user: user });
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