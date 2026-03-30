const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users.model');

function buildToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'gearmarket_dev_secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '2h' },
  );
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await usersModel.findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usersModel.createUser({ name, email, password: hashedPassword });
    const token = buildToken(user);

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      token,
      user,
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = buildToken(user);
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || null,
      },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
};
