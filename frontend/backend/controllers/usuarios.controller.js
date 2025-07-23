const pool = require('../db');

const obtenerUsuarios = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM usuarios');
    res.json(resultado.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

const crearUsuario = async (req, res) => {
  const { nombre, correo } = req.body;
  console.log('Datos recibidos:', nombre, correo);
  try {
    const nuevoUsuario = await pool.query(
      'INSERT INTO usuarios (nombre, correo) VALUES ($1, $2) RETURNING *',
      [nombre, correo]
    );
    console.log('Insertado en BD:', nuevoUsuario.rows[0]);
    res.json(nuevoUsuario.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ mensaje: 'Error al crear usuario' });
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
};

const actualizarUsuario = async (req, res) => {
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
};

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
};
