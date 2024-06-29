const express=require("express");
const app=express();
const {DBconnection}=require("./database/db.js");
const { generateFile } = require('./generateFile');
const {executeCpp}=require('./executeCpp.js');
const User=require("./models/User.js");
const Problem=require("./models/Problem.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
DBconnection();
app.get("/home",(req,res)=>{
    res.send("Home Page");
})
app.post("/signup",async (req,res)=>{
    try{
        const  {firstname,lastname,email,password,role}=req.body;
        if(!(firstname && lastname && password && email && role)){
            return res.status(400).json({ message: "Please enter all the fields" });
        }
        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = bcrypt.hashSync(password,10);
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
            role,
        });
        const token=jwt.sign({id:user._id,role:user.role},process.env.SECRET_KEY,{
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
        res.status(500).json({ message: "Internal server error" });
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
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true, // Only send cookie over HTTPS
            sameSite: 'none' ,
        };
        res.cookie('token', token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token
        });
        // res.status(200).cookie("token", token, options).json({
        //     message: "You have successfully logged in!",
        //     success: true,
        //     token,
        // });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});
//ALL PROBLEMS
app.get("/problems", async (req, res) => {
    try {
        const problems = await Problem.find({});
        res.json(problems);
    } catch (error) {
        console.log(" Unable to fetch problems," + error);
        res.status(500).json({ message: "Unable to fetch problems" });
    }
});
//INDIVIDUAL PROBLEM
app.get("/problems/:id", async (req, res) => {
    let {id}=req.params;
    try {
        const problem = await Problem.findById(id);
        if (!problem) {
            req.flash("error"," Problem does not exist");
            res.redirect("/problems");
            // return res.status(404).json({ message: "Problem not found" });
        }
        res.json(problem);
    }catch (error) {
        console.log("Unable to fetch problem : " + error);
        res.status(500).json({ message: "Unable to  fetch the problem" });
    }
});
// CREATE PROBLEM
app.post('/create_problem', async (req, res) => {
    try {
        const { problem_name, problem_statement, author, difficulty, userId } = req.body;

        if (!(problem_name && problem_statement && userId)) {
            return res.status(400).send("Please enter all the fields");
        }
        const problem = await Problem.create({ 
            problem_name, 
            problem_statement, 
            author, 
            difficulty, 
            createdBy: userId 
        });
        res.status(201).json({
            message: "Successfully created",
            success: true,
            problem
        });
    } catch (error) {
        console.log("Unable to create : " + error);
        res.status(500).json({ message: "Unknown Error" });
    }
});

// DELETE
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; 
    try {
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        if (problem.createdBy.toString()!== userId) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own problems" });
        }
        await Problem.findByIdAndDelete(id);
        res.json({ message: "Problem Deleted!!" });
    } catch (error) {
        console.log("Error while deleting : " + error);
        res.status(500).json({ message: "Unauthorized: You can only delete your own problems" });
    }
});

// UPDATE
app.put('/edit_problem/:id', async (req, res) => {
    const { id } = req.params;
    const { userId, problem } = req.body;
    try {
        const existingProblem = await Problem.findById(id);
        if (!existingProblem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        if (existingProblem.createdBy.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized: You can only edit your own problems" });
        }
        await Problem.findByIdAndUpdate(id, { ...problem });
        res.json({ message: "Problem Updated!!" });
    } catch (error) {
        console.log("Unable to edit " + error);
        res.status(500).json({ message: "Unable to edit" });
    }
});
//COMPILER
app.post('/run', async (req, res) => {
    let { language, code } = req.body;
    if (!language) language = 'cpp';
    if(!code) return res.status(400).json({success:false,message:"Empty Code"});
    try{
        const filePath=await generateFile(language,code);
        const output = await executeCpp(filePath);
        res.json({ filePath, output });
    }catch(error){
        res.status(500).json({success:false,message:"Error :"+error.message});
    }
    
});
app.listen(8080,()=>{
    console.log("app is listening");
});