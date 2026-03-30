const { Router } = require('express');
const profileController = require('../controllers/profile.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', authMiddleware, profileController.getProfile);

module.exports = router;
