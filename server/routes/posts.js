const { newPost, upload, getPosts, like, unlike, getTopPosts} = require('../controllers/postController')

const router = require('express').Router()

router.post('/post', newPost)
router.post('/getposts', getPosts)
router.post('/like', like)
router.post('/unlike', unlike)
router.post('/topposts', getTopPosts)


module.exports.PostsRouter = router