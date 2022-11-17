const router = require("express").Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// User Signup
router.post("/signup",async (req,res)=>{
    try{
        // Generating Secure Passwords
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);


        // Creating a new User details
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        })

        // Inserting into Mongodb
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);

    }catch(err){
        res.status(500).json(err.message);
    }
})

// User Login
router.post("/login",async (req,res)=>{
    try{
        // Find the User
        const user = await User.findOne({username:req.body.username});
        !user&&res.status(400).json("Username Doesn't Exist");

        // Validate the Password
        const result = await bcrypt.compare(req.body.password,user.password);
        !result&&res.status(400).json("Wrong Password");
        
        res.status(200).json("Successfully Logged in");
    }catch(err){
        res.status(500).json(err.message);
    }
})


module.exports = router;