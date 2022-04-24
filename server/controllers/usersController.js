const { UsersSchema } = require("../models/userModel");


module.exports.CreateAccount = async(req,res,next)=>{

    try {

        const {fullname,username, email,password}  = req.body

        //Validation
        const mailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const namePattern = /^[a-zA-Z\\s]*$/
        const usernamePattern = /(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g;
        
        if(fullname == "" || username=="" || email=="" || password==""){
           return res.json({msg: "All fields are required",status:false})
        }else if(!(fullname.length >= 4 || fullname.length <= 20 || fullname.match(namePattern))){
            return res.json({msg: "Invalid name given", status: false})
        }else if(!(username.match(usernamePattern) || username.length >= 4 || username.length <= 20)){
            return res.json({msg:"Username must not contain specail characters and must be between 4 an 20 characters",status:false})
        }else if(!email.match(mailPattern)){
            return res.json({msg:'invalid email address', status:false})
        }else if(password.length <8){
            return res.json({msg:"Password must be atleast 8 characters",status: "false"})
        }else{
            // const isEmailtTaken = await UsersSchema.find({email: email})

            // if(isEmailtTaken)
            res.json({msg:"Works"})
        }
        
    } catch (err) {
        next(err)
    }
}