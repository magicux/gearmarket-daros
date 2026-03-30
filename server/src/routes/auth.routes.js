const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const { validateRequiredFields } = require('../middlewares/validation.middleware');

const router = Router();

router.post('/register', validateRequiredFields(['name', 'email', 'password']), authController.register);
router.post('/login', validateRequiredFields(['email', 'password']), authController.login);

module.exports = router;
