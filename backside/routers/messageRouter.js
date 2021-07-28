const router = require('express').Router();
const messageCtrl = require('../controllers/messageCtrl')
const auth = require('../middlewares/auth')

router.post('/message', auth, messageCtrl.createMessage)
router.get('/conversations', auth, messageCtrl.getConversations)
router.get('/message/:id', auth, messageCtrl.getMessages)
router.delete('/message/:id', auth, messageCtrl.deleteMessages)


module.exports = router;