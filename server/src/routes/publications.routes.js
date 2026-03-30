const { Router } = require('express');
const publicationsController = require('../controllers/publications.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateRequiredFields } = require('../middlewares/validation.middleware');

const router = Router();

router.get('/', publicationsController.getAllPublications);
router.get('/:id', publicationsController.getPublicationById);
router.post(
  '/',
  authMiddleware,
  validateRequiredFields(['title', 'description', 'price', 'image_url', 'category', 'location']),
  publicationsController.createPublication,
);
router.put('/:id', authMiddleware, publicationsController.updatePublication);
router.delete('/:id', authMiddleware, publicationsController.deletePublication);

module.exports = router;
