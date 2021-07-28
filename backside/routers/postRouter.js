const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middlewares/auth')

router.route('/posts')
.post(auth, postCtrl.createPost)
.get(auth, postCtrl.getPost)

router.route('/post/:id')
.patch(auth, postCtrl.updatePost)
.get(auth, postCtrl.getSinglePost)
.delete(auth,postCtrl.deletePost)

router.patch('/post/:id/like',auth, postCtrl.likePost)
router.patch('/post/:id/unlike',auth, postCtrl.unlikePost)
router.get('/userposts/:id',auth,postCtrl.getUserPosts)
router.patch('/save/:id',auth,postCtrl.savePost)
router.patch('/unsave/:id',auth,postCtrl.unsavePost)
router.get('/savedpost',auth,postCtrl.getsavedPost)

module.exports = router;

