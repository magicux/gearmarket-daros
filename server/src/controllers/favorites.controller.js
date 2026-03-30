const favoritesModel = require('../models/favorites.model');

async function getFavorites(req, res, next) {
  try {
    const favorites = await favoritesModel.getFavoritesByUser(req.user.id);
    return res.status(200).json(favorites);
  } catch (error) {
    return next(error);
  }
}

async function addFavorite(req, res, next) {
  try {
    await favoritesModel.addFavorite(req.user.id, req.body.publication_id);
    return res.status(201).json({ message: 'Favorito agregado' });
  } catch (error) {
    return next(error);
  }
}

async function deleteFavorite(req, res, next) {
  try {
    await favoritesModel.deleteFavorite(req.user.id, req.params.publicationId);
    return res.status(200).json({ message: 'Favorito eliminado' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};
