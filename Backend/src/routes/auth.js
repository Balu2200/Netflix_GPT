const express = require("express");
const userModel = require("../model/user");
const {validateSignupData} = require("../utils/validations");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        const data = validateSignupData(req);
        const {name, email, password} = data;
        const passwordhash = await bcrypt.hash(password, 10);

        const user = new userModel({name, email, password: passwordhash});

        await user.save();
        return res.status(201).send("Profile created successfully.");
    } catch (err) {
        console.error("Error Detected", err.message);
        return res.status(500).send("Error: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password are required.");
        }

        const user = await userModel.findOne({email:email});
        if(!user){
            throw new Error("Email is not found");
        }
        
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){

            const token = await user.getJWT();
            res.cookie("token", token, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
            res.send("Login Successful");
        }
        else{
            throw new Error("Invalid password");
        }
        
    } catch (err) {
        console.error("Error Detected", err.message);
        return res.status(500).send("Error: " + err.message);
    }
});

authRouter.post("/logout", (req, res) => {
    
    try{
        res.cookie("token",null, {expires:new Date(Date.now())});
        res.send("Logout Successfully");
    }
    catch(err){
        res.send("Error:"+err.message);
    }
});

module.exports = authRouter;