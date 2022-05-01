const { searchUsers, getUser,follow,unfollow } = require('../controllers/usersController')

const usersRouter = require('express').Router()

usersRouter.post('/searchusers', searchUsers)
usersRouter.post('/getuser', getUser)
usersRouter.post('/follow', follow)
usersRouter.post('/unfollow', unfollow)

module.exports.UsersRouter = usersRouter