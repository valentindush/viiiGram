const express = require('express')
const { CreateAccount, login, verifyAccount } = require('../controllers/usersController')
const router = express.Router()


router.post('/signup',CreateAccount)
router.post('/login', login)
router.post('/verification',verifyAccount)


module.exports.AuthRouter = router