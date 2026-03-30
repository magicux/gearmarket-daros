const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const publicationsRoutes = require('./routes/publications.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const messagesRoutes = require('./routes/messages.routes');
const profileRoutes = require('./routes/profile.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*'}));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, service: 'gearmarket-server' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/publications', publicationsRoutes);
app.use('/api/v1/favorites', favoritesRoutes);
app.use('/api/v1/messages', messagesRoutes);
app.use('/api/v1/profile', profileRoutes);

app.use(errorMiddleware);

module.exports = app;
