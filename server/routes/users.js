const { searchUsers, getUser } = require('../controllers/usersController')

const usersRouter = require('express').Router()

usersRouter.post('/searchusers', searchUsers)
usersRouter.post('/getuser', getUser)

module.exports.UsersRouter = usersRouter