// backend/routes/usuarios.routes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  const resultado = await pool.query('SELECT * FROM usuarios');
  res.json(resultado.rows);
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, correo } = req.body;
  console.log('Datos recibidos:', nombre, correo); // 👈 Agregado

  try {
    const nuevoUsuario = await pool.query(
      'INSERT INTO usuarios (nombre, correo) VALUES ($1, $2) RETURNING *',
      [nombre, correo]
    );
    console.log('Insertado en BD:', nuevoUsuario.rows[0]); // 👈 Agregado
    res.json(nuevoUsuario.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ mensaje: 'Error al crear usuario' });
  }
});


// Eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
});

// Actualizar un usuario por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  try {
    const resultado = await pool.query(
      'UPDATE usuarios SET nombre = $1, correo = $2 WHERE id = $3 RETURNING *',
      [nombre, correo, id]
    );
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
});



module.exports = router;
