const express = require('express')
const cors = require('cors')
const app = express()
const usuariosRoutes = require('./routes/usuarios.routes');

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use('/api/usuarios', usuariosRoutes);


app.listen(4000, () => {
  console.log('Servidor backend corriendo en http://localhost:4000')
})
