const express = require('express');
const router = express.Router();
const pool = require('../db'); // <- tu conexión a PostgreSQL
const {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
} = require('../controllers/usuarios.controller');

const validarUsuario = require('../middlewares/validarUsuario.middleware');

// Ahora solo conectas ruta con función
// Rutas
router.get('/', obtenerUsuarios);
router.post('/', validarUsuario, crearUsuario);         // <-- validación
router.put('/:id', validarUsuario, actualizarUsuario);  // <-- validación
router.delete('/:id', eliminarUsuario);

module.exports = router;
