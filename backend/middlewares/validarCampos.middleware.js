// middlewares/validarCampos.middleware.js
const validarCampos = (req, res, next) => {
  const { correo, password, nombre } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
  }

  // Si es registro, también validar nombre
  if (req.path === '/register' && !nombre) {
    return res.status(400).json({ mensaje: 'El nombre es obligatorio para registrarse' });
  }

  next();
};

module.exports = validarCampos;
