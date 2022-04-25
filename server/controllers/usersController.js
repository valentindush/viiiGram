const { UsersSchema } = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports.CreateAccount = async(req,res,next)=>{

    try {

        const {fullname,username, email,password}  = req.body

        //Validation
        const mailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const namePattern = /^[a-zA-Z\\s]*$/
        const usernamePattern = /^[a-zA-Z0-9_][a-zA-Z0-9_.]*/;
        
        if(fullname == "" || username=="" || email=="" || password==""){
           return res.json({msg: "All fields are required",status:false})
        }else if(fullname.length < 4 || fullname.length > 20){
            return res.json({msg: "Invalid name given", status: false})
        }else if(username.length < 4 || username.length > 20){
            return res.json({msg:"Username must not contain specail characters and must be between 4 an 20 characters",status:false})
        }else if(!email.match(mailPattern)){
            return res.json({msg:'invalid email address', status:false})
        }else if(password.length <8){
            return res.json({msg:"Password must be atleast 8 characters",status: "false"})
        }else{
            const isEmailtTaken = await UsersSchema.find({email: email})
            if(isEmailtTaken){
                return res.json({msg: "Email is already taken", status: false})
            }else{

                const newPasword = await bcrypt.hash(password,10)

                const code = Math.floor(Math.random() * 1000)
                const date = Date.now()
                const verficationCode  = code.toString() + date.toString()

                const newUser = UsersSchema({
                    fullname: fullname,
                    username: username,
                    email: email,
                    password: password,
                    verified: false,
                    verficationCode: verficationCode
                })
                
                if(await newUser.save()){
                    const accessToken = await jwt.sign()
                }else{
                    return res.json({msg: "db error", status: false})
                }
            }
        }
        
    } catch (err) {
        next(err)
    }
}