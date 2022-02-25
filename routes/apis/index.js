const express = require('express')
const passport = require('passport')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handlers')
const userController = require('../../controllers/apis/user-controller')
const adminController = require('../../controllers/apis/admin-controller')
const tweetController = require('../../controllers/apis/tweet-controller')
const followController = require('../../controllers/apis/follow-controller')
const upload = require('../../middleware/multer')
const { authenticated, authenticatedAdmin, authenticatedUser } = require('../../middleware/apiAuth')
const uploadFields = [
  { name: 'avatar', maxCount: 1 },
  { name: 'cover', maxCount: 1 }
]

router.post('/tweets/:id/like', tweetController.addLike)
router.post('/tweets/:id/unlike', tweetController.removeLike)
router.post('/tweets/:id/replies', tweetController.postReply)
router.get('/tweets/:id/replies', tweetController.getReplies)
router.get('/tweets/:id', tweetController.getTweet)
router.post('/tweets', tweetController.postTweet)
router.get('/tweets', tweetController.getTweets)
router.delete('/followships/:followingId', followController.deleteFollowing)
router.post('/followships', followController.postFollowing)
router.get('/users/:id/tweets', userController.getTweets)
router.get('/users/:id/replied_tweets', userController.getReplies)
router.get('/users/:id/likes', userController.getLikes)
router.post('/users/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.put('/users/:id/account', userController.putUserAccount)
router.put('/users/:id', upload.fields(uploadFields), userController.putUser)
router.post('/users', userController.signUp)
router.delete('/admin/tweets/:id', adminController.deleteTweet)
router.get('/admin/tweets', adminController.getTweets)
router.get('/admin/users', adminController.getUsers)
router.post('/admin/signin', passport.authenticate('local', { session: false }), adminController.signIn)

router.use('/', apiErrorHandler)

module.exports = router
