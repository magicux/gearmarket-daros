const usersModel = require('../models/users.model');

async function getProfile(req, res, next) {
  try {
    const user = await usersModel.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

module.exports = { getProfile };
