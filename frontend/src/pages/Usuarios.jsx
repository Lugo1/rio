import { useEffect, useState } from 'react';
//const API_URL = import.meta.env.VITE_API_URL;
// 🧠 Esto se adapta a local o producción automáticamente
const API_URL = import.meta.env.VITE_BACKEND_URL;


function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  useEffect(() => {
    //fetch('http://localhost:4000/api/usuarios')
    fetch(`${API_URL}/api/usuarios`)
      .then(res => res.json())
      .then(data => {
        console.log('Usuarios recibidos:', data);
        setUsuarios(data);
      })
      .catch(err => console.error('Error al obtener usuarios:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const res = await fetch('http://localhost:4000/api/usuarios', {
    const res = await fetch(`${API_URL}/api/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo })
    });
    const data = await res.json();
    setUsuarios([...usuarios, data]);
    setNombre('');
    setCorreo('');
  };

  const handleEliminar = async (id) => {
  //await fetch(`http://localhost:4000/api/usuarios/${id}`, {
  await fetch(`${API_URL}/api/usuarios/${id}`, {
    method: 'DELETE'
  });
  setUsuarios(usuarios.filter(usuario => usuario.id !== id));
};


  return (
    <div className="p-4 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          className="text-black p-2 mr-2"
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="text-black p-2 mr-2"
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Agregar
        </button>
      </form>

      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id} className="mb-2">
            {usuario.nombre} - {usuario.correo}
            <button
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => handleEliminar(usuario.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Usuarios;
