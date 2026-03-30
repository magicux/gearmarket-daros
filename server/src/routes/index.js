const { Router } = require('express');
const authRoutes = require('./auth.routes');
const publicationsRoutes = require('./publications.routes');
const favoritesRoutes = require('./favorites.routes');
const messagesRoutes = require('./messages.routes');
const profileRoutes = require('./profile.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/publications', publicationsRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/messages', messagesRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
