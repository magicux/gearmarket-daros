const publicationsModel = require('../models/publications.model');

async function getAllPublications(_req, res, next) {
  try {
    const publications = await publicationsModel.getAllPublications();
    return res.status(200).json(publications);
  } catch (error) {
    return next(error);
  }
}

async function getPublicationById(req, res, next) {
  try {
    const publication = await publicationsModel.getPublicationById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    return res.status(200).json(publication);
  } catch (error) {
    return next(error);
  }
}

async function createPublication(req, res, next) {
  try {
    const publication = await publicationsModel.createPublication({
      ...req.body,
      user_id: req.user.id,
    });

    return res.status(201).json({
      message: 'Publicación creada correctamente',
      publication_id: publication.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function updatePublication(req, res, next) {
  try {
    const current = await publicationsModel.getPublicationById(req.params.id);
    if (!current) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    if (Number(current.user_id) != Number(req.user.id)) {
      return res.status(403).json({ message: 'No puedes editar esta publicación' });
    }

    await publicationsModel.updatePublication(req.params.id, req.body);
    return res.status(200).json({ message: 'Publicación actualizada correctamente' });
  } catch (error) {
    return next(error);
  }
}

async function deletePublication(req, res, next) {
  try {
    const current = await publicationsModel.getPublicationById(req.params.id);
    if (!current) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    if (Number(current.user_id) != Number(req.user.id)) {
      return res.status(403).json({ message: 'No puedes eliminar esta publicación' });
    }

    await publicationsModel.deletePublication(req.params.id);
    return res.status(200).json({ message: 'Publicación eliminada correctamente' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  deletePublication,
};
