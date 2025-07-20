const express = require('express')
const cors = require('cors')
const app = express()
const usuariosRoutes = require('./routes/usuarios.routes');

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use('/api/usuarios', usuariosRoutes);

// Rutas
app.get('/api/usuarios', async (req, res) => {
  const pool = require('./db'); // usa el archivo que ya creaste

  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});


app.listen(4000, () => {
  console.log('Servidor backend corriendo en http://localhost:4000')
})
