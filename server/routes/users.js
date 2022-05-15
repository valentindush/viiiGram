const { searchUsers, getUser,follow,unfollow, getAllUsers } = require('../controllers/usersController')

const usersRouter = require('express').Router()

usersRouter.post('/searchusers', searchUsers)
usersRouter.post('/getuser', getUser)
usersRouter.post('/follow', follow)
usersRouter.post('/unfollow', unfollow)
usersRouter.post('/getallusers', getAllUsers)

module.exports.UsersRouter = usersRouter