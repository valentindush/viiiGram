const jwt = require('jsonwebtoken')
const { MessageSchema } = require('../models/messageModel')

module.exports.sendMsg = async(req,res,next)=>{

    try {
        
        const {msg,receiver,token} = req.body

        if(!msg || !receiver ||!token) return res.status(402)

        if(!token) return res.status(403)

        const decoded = jwt.verify(token,process.env.JWT_KEY)
        if(!decoded) return res.status(403)

        try {

            const newMsg = MessageSchema({
                msg: msg,
                sender: decoded._id,
                receiver: receiver
            })
            await newMsg.save()
            return res.json({msg, status: true})
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

        if(!token || ! receiver) return res.status(402)
        if(!receiver) return res.status(404)

        const decoded  = jwt.verify(token,process.env.JWT_KEY)
        if(!decoded) return res.status(403)

        try {
            const messages  = await MessageSchema.find({sender: decoded._id,receiver:receiver})
            return res.json({messages,status:true})

        } catch (err) {
            return res.status(500)
        }


    } catch (err) {
        next(err)
    }
}