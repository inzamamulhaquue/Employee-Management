const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');


//signup

router.post('/register', async(req,res) =>{
    try{
        const {email, username, password} = req.body;
        const hashedpassword = bcrypt.hashSync(password);

        // Check if email already exists or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: 'User already registered' });
        }
        const user = new User ({email, username, password: hashedpassword});
        await user.save();
            return res.status(200).json({message:"Sign Up Successfull"});
    } catch (err) {
        console.error(err);
        res.status(200).json({ essage:"User Already Exists"});
    }
});

//login
router.post('/login', async (req, res) =>{
    try{
        //find user email
        const user = await User.findOne({email: req.body.email});
        if(!user)
            return res.status(200).json({message : 'Please SignUp First'});

        //hashed password
        const isMatch = bcrypt.compareSync(req.body.password, user.password);
        if(!isMatch)
            res.status(200).json({message : 'invalid  password'});

        const {password, ...others } = user._doc;
        return res.status(200).json({ others });
    } catch (err){
        res.status(200).json({message: "user already exists"});
    }
});

module.exports = router;