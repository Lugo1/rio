// middlewares/validarJWT.middleware.js //validarJWT.middleware.js (para proteger rutas)
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = id;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = validarJWT;
