// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const validarJWT = require('../middlewares/validarJWT.middleware');
const authController = require('../controllers/auth.controller');

// Ruta protegida
router.get('/perfil', validarJWT, (req, res) => {
  res.json({ mensaje: 'Ruta protegida', usuarioId: req.usuarioId });
});
    

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
