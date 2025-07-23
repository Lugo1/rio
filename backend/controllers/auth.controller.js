// controllers/auth.controller.js
const bcrypt = require('bcrypt');
const db = require('../config/db');
const generarJWT = require('../helpers/generarJWT');

const register = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  try {
    // Verificar si ya existe el correo
    const existe = await db.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    
    if (existe.rows.length > 0) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contraseña, salt);

    // Insertar usuario en la BD
    const nuevoUsuario = await db.query(
      'INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1, $2, $3) RETURNING *',
      [nombre, correo, hash]
    );

    // Generar token
    const token = await generarJWT(nuevoUsuario.rows[0].id);

    res.status(201).json({
      usuario: nuevoUsuario.rows[0],
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ mensaje: 'Error al registrar' });
  }
};

const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const resultado = await db.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);

    if (resultado.rows.length === 0) {
      return res.status(400).json({ mensaje: 'Correo no registrado' });
    }

    const usuario = resultado.rows[0];

    // Comparar contraseñas
    const valido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valido) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};

module.exports = {
  register,
  login,
};

