//✅ Validas la entrada del usuario antes de llegar al controlador.
//✅ Código más profesional y organizado.
//✅ Fácil de extender (puedes agregar más validaciones o middlewares).

// middlewares/validarUsuario.middleware.js

const validarUsuario = (req, res, next) => {
  const { nombre, correo } = req.body;

  if (!nombre || !correo) {
    return res.status(400).json({
      mensaje: 'El nombre y el correo son obligatorios',
    });
  }

  // Si todo está bien, continúa
  next();
};

module.exports = validarUsuario;
