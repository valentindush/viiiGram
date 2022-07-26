const jwt = require('jsonwebtoken')
const { MessageSchema } = require('../models/messageModel')

module.exports.sendMsg = async(req,res,next)=>{

    try {
        
        const {msg,receiver,token} = req.body

        if(!msg || !receiver ||!token) return res.status(402)
        if(msg === "") return res.status(402)
        if(!token) return res.status(403)

        const decoded = jwt.verify(token,process.env.JWT_KEY)
        if(!decoded) return res.status(403)

        try {

            const newMsg = MessageSchema({
                msg: msg,
                sender: decoded.id,
                receiver: receiver,
                people: [decoded.id,receiver],
                time: new Date(Date.now())
            }).save()
            return res.json({newMsg, status: true})
        } catch (err) {

            return res.status(500)
        }

    } catch (err) {
        next(err)
    }
}

module.exports.getMessages = async(req,res,next)=>{
    try {
        
        const {token,receiver} = req.body
        console.log(req.body)
        if(!token || !receiver) return res.status(402).json({msg: "token is required"})
        const decoded  = jwt.verify(token,process.env.JWT_KEY)
        if(!decoded) return res.status(403).json({msg:"invalid token"})

        // const arr = []
        // arr.in

        try {
            const messages  = await MessageSchema.find({sender: decoded.id || receiver,receiver:receiver||decoded.id})
            return res.json({data:messages,status:true})

        } catch (err) {
            return res.status(500)
        }


    } catch (err) {
        next(err)
    }
}