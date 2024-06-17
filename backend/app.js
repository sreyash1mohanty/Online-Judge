const express=require("express");
const app=express();
const {DBconnection}=require("./database/db.js");
const User=require("./models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
DBconnection();
app.get("/home",(req,res)=>{
    res.send("Home Page");
})
app.post("/register",async (req,res)=>{
    try{
        const  {firstname,lastname,email,password,role}=req.body;
        if(!(firstname && lastname && password && email && role)){
            return res.status(400).send("Please enter all the fields");
        }
        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).send("User already exists");
        }
        const hashPassword = bcrypt.hashSync(password,10);
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
            role,
        });
        const token=jwt.sign({id:user._id,role},process.env.SECRET_KEY,{
            expiresIn:"2h"
        });
        user.token=token;
        user.password=undefined;
        res.status(201).json({
            mssg:"you have succefully registered",
            user
        })
    }catch(error){
        console.error(error);
    }
})
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("Please enter all the fields");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }
        const token = jwt.sign({ id: user._id,role}, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error.message);
    }
});
app.listen(8080,()=>{
    console.log("app is listening");
});