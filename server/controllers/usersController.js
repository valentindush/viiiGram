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
        
        if(fullname === "" || username==="" || email==="" || password===""){
           return res.json({msg: "All fields are required",status:false})
        }else if(fullname.length < 4 || fullname.length > 20){
            return res.json({msg: "must not contain special characters and must be between 4 an 20 characters", status: false})
        }else if(username.length < 4 || username.length > 20){
            return res.json({msg:"Username must not contain special characters and must be between 4 an 20 characters",status:false})
        }else if(!email.match(mailPattern)){
            return res.json({msg:'invalid email address', status:false})
        }else if(password.length <8 || password.length > 20){
            return res.json({msg:"Password must be at least 8 characters and not more than 20",status: "false"})
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
                    followers: [],
                    following: [],
                    verified: false,
                    verificationCode: verficationCode
                })
                
                if(await newUser.save()){
                    const accessToken =  jwt.sign({email: email, username: username, fullname: fullname},process.env.JWT_KEY,{expiresIn: '1d'})

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

module.exports.login_home = async (req,res,next)=>{
    try{

        const token = req.body.token
        const jwtData = jwt.verify(token, process.env.JWT_KEY)

        if(jwtData){

            const user  = await UsersSchema.findOne({username: jwtData.username})
            if(user){
                return  res.status(200).json({msg: "true", code: 200, status: true})
            }else{
                return  res.status(402).json({msg: 'auth failed', code: 403, status: false})
            }

        }else {
            return res.status(403).json({msg: 'BAD REQ',code: 403, status: false})
        }


    }catch (e) {
        next(e)
    }
}

module.exports.login = async (req,res,next)=>{

    try {

        const email = req.body.email
        const password = req.body.password

        const user = await UsersSchema.findOne({email: email})
        if(!user) return res.json({msg:"Incorrect username or password", status: false})
        if(await bcrypt.compare(password,user.password)){

            // if(user.verified === false) return res.json({msg: "Account is not verified please check your email inbox and verfy it",status:false})

            const accessToken = jwt.sign({email: email, username: user.username,fullname: user.fullname}, process.env.JWT_KEY, {expiresIn: '1d'})

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

module.exports.getAllUsers = async(req,res,next)=>{
    try {

        const token = req.body.token

        if(token){
            
            const userData = jwt.verify(token)

            if(!token) return res.status(403).json({msg:" ", status: false})

            if(token){

                const users = await UsersSchema.find()

                return res.json({users: users, status: true})
            }

        }else{
            return res.json({msg: "", code: 500})
        }
        
    } catch (err) {
        return res.status(503)
        next(err)
    }
}

module.exports.searchUsers = async (req,res,next)=>{

    try{

        const searchString = req.body.str
        const token = req.body.token        

        if(!token || token == null || token == "") {
            return res.json({msg: "Wrong 12 request", code: "403",status: true})
        }

        const from__data = jwt.verify(token.toString(), process.env.JWT_KEY)

        if(!from__data) return res.json({msg: "wrong req",code: 403, status: false})

        const users = await UsersSchema.find({username: {$ne: from__data.username},$text: {$search: searchString}}).select([
            "fullname",
            "username",
            "followers",
            "following"
        ])

        if(users){
            return res.json({status: true, code: 200, result: users})
        }

    }catch(err){
        next(err)
    }
}

module.exports.getUser = async (req,res,next)=>{

    try {

        const token = req.body.token
        const id = req.body.uuid

        if(!token) return res.json({msg: "wrong tpken request",code: 403, status: false})
        if(!id) return res.json({msg: "wrong id request",code: 403, status: false})

        const reqData = jwt.verify(token, process.env.JWT_KEY)
        if(!reqData) return res.json({msg: "wrong 3re request",code: 403, status: false})


        const user  = await UsersSchema.findOne({_id: id}).select([
            "username",
            "fullname",
            "followers",
            "following"
        ])

        if(!user) return res.json({msg: "User not found",code: 404, status: false})

        if(user) return res.json({msg: "", code: 200, status: true, result: user})


        
        
    } catch (err) {
        next(err)
    }
}

module.exports.follow = async(req,res,next)=>{

    try {
        const token = req.body.token
        if(!token) return res.json({msg: "wrong ||  request", code: 403, status: false})
        const userToFollowId = req.body.to_id

        
        const From__Data = jwt.verify(token, process.env.JWT_KEY)
        if(!From__Data) return res.json({msg: "wrong ||||||||| request",code: 403, status: false})

        const user = await UsersSchema.findOne({email: From__Data.email})
        if(!user) return res.json({msg: "wrong @@ request",code: 403, status: false})

        if(!userToFollowId) return res.json({msg: "wrong request",code: 403, status: false})

        const userTofollow = await UsersSchema.findOne({_id: userToFollowId})
        if(!userTofollow) return res.json({msg: "wrong request",code: 403, status: false})

        if(userTofollow){
            if(userTofollow.username != From__Data.username){
                if(await UsersSchema.updateOne({_id: userToFollowId}, {$addToSet: {followers: From__Data.username}}) 
                && await UsersSchema.updateOne({username: From__Data.username},{$addToSet: {following: userToFollowId}} )){
                    
                    // console.log(From__Data.username);
                    // console.log(await UsersSchema.findById(userToFollowId))
                    return res.json({msg: "followed", status: true,code: 200})
                }else{
                    res.json({msg: "failed", status: false, code: 403})
                }
            }else{
                return res.json({msg: "Hcking doesn't work LOl", code: "fck you", status: false})
            }
        }else{
            res.json({msg: "failed", status: false, code: 403})
        }



    } catch (err) {
        next(err)
    }
}

module.exports.unfollow = async(req,res,next)=>{

    try {

        const token = req.body.token
        const unfollow_id = req.body.unfollow_id

        if(!token || !unfollow_id) return res.json({msg: "Wrong 1 request",code: 403, status: false})
        
        const from__data = jwt.verify(token, process.env.JWT_KEY)
        if(!from__data) return res.json({msg: "Wrong 2 request", code: 403, status: false})

        const user = await UsersSchema.findOne({email: from__data.email})

        if(!user) return res.json({msg: "wrong 3 request", code: 403, status: false})

        if(user){

            if(await UsersSchema.updateOne({_id: unfollow_id}, {$pull : {followers: from__data.username}})
            && await UsersSchema.updateOne({email: from__data.email}, {$pull: {following: unfollow_id}})){

                return res.json({msg: "unfollowed", code: 200, status: true})
            }else{
                return res.json({msg: "failed", code: 500, status: false})
            }
        }


        
    } catch (err) {
        next(err)
    }
}