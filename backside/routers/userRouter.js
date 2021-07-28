const router = require('express').Router();
const auth = require('../middlewares/auth');
const userCtrl = require ('../controllers/userCtrl')

router.get('/search',auth, userCtrl.searchUser)
router.get('/user/:id',auth, userCtrl.getUser)
router.patch('/user',auth, userCtrl.updateUser)
router.patch('/user/:id/friend',auth, userCtrl.friend)
router.patch('/user/:id/unfriend',auth, userCtrl.unfriend)


module.exports = router;