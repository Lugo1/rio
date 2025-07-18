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
  const { Pool } = require('pg')
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

  try {
    const result = await pool.query('SELECT * FROM usuarios')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los usuarios' })
  }
})

app.listen(4000, () => {
  console.log('Servidor backend corriendo en http://localhost:4000')
})
