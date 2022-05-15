const express = require('express')
const { CreateAccount, login, verifyAccount, login_home} = require('../controllers/usersController')
const router = express.Router()


router.post('/signup',CreateAccount)
router.post('/login', login)
router.post('/verification',verifyAccount)
router.post('/login_home',login_home)


module.exports.AuthRouter = router