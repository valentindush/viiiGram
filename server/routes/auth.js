const express = require('express')
const { CreateAccount } = require('../controllers/usersController')
const router = express.Router()


router.post('/signup',CreateAccount)


module.exports.AuthRouter = router