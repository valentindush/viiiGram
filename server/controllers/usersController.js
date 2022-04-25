const { UsersSchema } = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { SendVerificationCode } = require("../utils/mailVerification");
require('dotenv').config()


module.exports.CreateAccount = async(req,res,next)=>{

    try {

        const fullname  = req.body.fullname
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        //Validation
        const mailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const namePattern = /^[a-zA-Z\\s]*$/
        const usernamePattern = /^[a-zA-Z0-9_][a-zA-Z0-9_.]*/;
        
        if(fullname == "" || username=="" || email=="" || password==""){
           return res.json({msg: "All fields are required",status:false})
        }else if(fullname.length < 4 || fullname.length > 20){
            return res.json({msg: "must not contain specail characters and must be between 4 an 20 characters", status: false})
        }else if(username.length < 4 || username.length > 20){
            return res.json({msg:"Username must not contain specail characters and must be between 4 an 20 characters",status:false})
        }else if(!email.match(mailPattern)){
            return res.json({msg:'invalid email address', status:false})
        }else if(password.length <8 || password.length > 20){
            return res.json({msg:"Password must be atleast 8 characters and not more than 20",status: "false"})
        }else{
            const isEmailtTaken = await UsersSchema.findOne({email: email})
            if(isEmailtTaken){
                return res.json({msg: "Email is already taken", status: false})
            }else{
                const isUsernameTaken = await UsersSchema.findOne({username: username})

                if(isUsernameTaken) return res.json({msg: "Username is  already taken"})
                const newPasword = await bcrypt.hash(password,10)

                const code = Math.floor(Math.random() * 100000)
                const date = Date.now()
                const verficationCode  = `${code.toString() + date.toString()}`
                const newUser = UsersSchema({
                    fullname: fullname,
                    username: username,
                    email: email,
                    password: newPasword,
                    followers: {},
                    following: {},
                    verified: false,
                    verificationCode: verficationCode
                })
                
                if(await newUser.save()){
                    const accessToken =  jwt.sign({email: username,password:password},process.env.JWT_KEY,{expiresIn: '1d'})

                    SendVerificationCode(verficationCode,email,newUser._id)

                    console.log("done")
                    
                    return res.json({token: accessToken, status: true})

                }else{
                    return res.json({msg: "db error", status: false})
                }
            }
        }
        
    } catch (err) {
        next(err)
    }
}

module.exports.login = async (req,res,next)=>{

    try {

        const email = req.body.email
        const password = req.body.password

        const user = await UsersSchema.findOne({email: email})
        if(!user) return res.json({msg:"Incorrect username or password", status: false})
        if(await bcrypt.compare(password,user.password)){

            if(user.verified === false) return res.json({msg: "Account is not verified please check your email inbox and verfy it",status:false})

            const accessToken = jwt.sign({email: email, password: password}, process.env.JWT_KEY, {expiresIn: '1d'})

            return res.json({status: true, token: accessToken})

            
        }else{
            return res.json({msg: "Incorrect username or password", status: false})
        }
        
    } catch (err) {
        next(err)
    }
}

module.exports.verifyAccount = async (req,res,next)=>{

    try {

        const code = req.body.code
        const uuid = req.body.uuid
        const user = await UsersSchema.findById(uuid)

        if(user){

            if(user.verificationCode == code){
                const updateUser = await UsersSchema.updateOne({_id: user._id},{$set:{verified:true}})
                if(updateUser){
                    return res.json({msg: "verified", status: false})
                }
            }else{
                return req.json({msg: "Account verification failed", status: false})
            }
        }
        
    } catch (err) {
        
        next(err)
    }
}