const { newPost, upload, getPosts, like, unlike, getTopPosts, addComment, deleteComment} = require('../controllers/postController')

const router = require('express').Router()

router.post('/post', newPost)
router.post('/getposts', getPosts)
router.post('/like', like)
router.post('/unlike', unlike)
router.post('/topposts', getTopPosts)
router.post('/comment',addComment)
router.post("/deleteComment",deleteComment)


module.exports.PostsRouter = router