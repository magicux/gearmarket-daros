const { Router } = require('express');
const messagesController = require('../controllers/messages.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateRequiredFields } = require('../middlewares/validation.middleware');

const router = Router();

router.get('/', authMiddleware, messagesController.getConversations);
router.get('/thread/:publicationId/:userId', authMiddleware, messagesController.getThread);

router.post(
  '/',
  authMiddleware,
  validateRequiredFields(['receiver_id', 'publication_id', 'message']),
  messagesController.createMessage,
);

module.exports = router;
