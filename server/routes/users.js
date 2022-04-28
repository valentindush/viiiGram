const { searchUsers } = require('../controllers/usersController')

const UsersRouter = require('express').Router()

UsersRouter.post('/searchusers', searchUsers)

module.exports.UsersRouter = UsersRouter