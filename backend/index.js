const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');

// Routers
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');

// .env file configuration
dotenv.config();

// MiddleWares
app.use(express.json());

// Mongodb Connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MongoDB Connected");
}).catch(err=>{
    console.log(err.message);
});

// For Pin Router
app.use('/api/pin',pinRoute);

// For User Login and Signup
app.use('/api/user',userRoute);

app.listen(8800,()=>{
    console.log("Server Started at 8800 Port");
})