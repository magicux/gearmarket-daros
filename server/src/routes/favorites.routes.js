const { Router } = require('express');
const favoritesController = require('../controllers/favorites.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateRequiredFields } = require('../middlewares/validation.middleware');

const router = Router();

router.use(authMiddleware);
router.get('/', favoritesController.getFavorites);
router.post('/', validateRequiredFields(['publication_id']), favoritesController.addFavorite);
router.delete('/:publicationId', favoritesController.deleteFavorite);

module.exports = router;
