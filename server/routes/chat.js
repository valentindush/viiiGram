const router = require('express').Router()
const {sendMsg,getMessages} = require('../controllers/msgController')

router.post("/send",sendMsg)
router.post("/getall",getMessages)

module.exports.chatRouter = router