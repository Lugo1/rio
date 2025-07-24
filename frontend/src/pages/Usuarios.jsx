import { useEffect, useState } from 'react';
import { UserPlus, Trash2, Mail, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  useEffect(() => {
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
    await fetch(`${API_URL}/api/usuarios/${id}`, {
      method: 'DELETE'
    });
    setUsuarios(usuarios.filter(usuario => usuario.id !== id));
  };

  return (
    <div className="min-h-screen bg-[--color-bg] text-white py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">👥 Lista de Usuarios</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-[#1f1f1f] p-6 rounded-xl shadow-lg space-y-4"
      >
        <div className="relative">
          <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[--color-primary] hover:bg-[#00c494] text-black font-bold py-2 px-4 rounded-md transition-all"
        >
          <UserPlus size={20} /> Agregar Usuario
        </button>
      </form>

      <div className="mt-10 max-w-2xl mx-auto space-y-4">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-lg shadow"
          >
            <div>
              <p className="font-semibold">{usuario.nombre}</p>
              <p className="text-sm text-gray-400">{usuario.correo}</p>
            </div>
            <button
              onClick={() => handleEliminar(usuario.id)}
              className="text-red-400 hover:text-red-600 transition"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Usuarios;
