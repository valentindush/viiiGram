const express = require('express')
const { CreateAccount, login } = require('../controllers/usersController')
const router = express.Router()


router.post('/signup',CreateAccount)
router.post('/login', login)


module.exports.AuthRouter = router