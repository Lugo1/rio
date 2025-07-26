import { useEffect, useState } from 'react';
import { UserPlus, Trash2, Mail, User } from 'lucide-react';
import Button from "../components/ui/Button";
import LabeledInput from "../components/ui/LabeledInput"; // Asegúrate de tener este componente

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/usuarios`)
      .then(res => res.json())
      .then(data => setUsuarios(data))
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-teal-400">
        Gestión de Usuarios
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-[#1f1f1f] p-6 rounded-2xl shadow-xl space-y-5"
      >
        <LabeledInput
          icon={User} // ✅ sin <>
          id="nombre1"
          label="Nombre"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <LabeledInput
          id="email1"
          label="email"
          placeholder="Correo electrónico"
          icon={User} // ✅ sin <>
          value={correo}
          onChange={(e) => setNombre(e.target.value)}
        />

        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[--color-primary] hover:bg-[--color-primary-hover] text-black font-bold transition-all"
        >
          <UserPlus size={20} /> Agregar Usuario
        </Button>
      </form>

      <div className="mt-10 max-w-2xl mx-auto space-y-4">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-xl shadow-md hover:bg-[#222] transition-all"
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
