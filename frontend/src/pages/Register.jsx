import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validación simple
  if (!nombre || !correo || !contraseña) {
    setError('Todos los campos son obligatorios');
    return;
  }

  setLoading(true);   // <-- Empieza carga
  setError('');       // <-- Limpia errores anteriores

  if (contraseña.length < 6) {
    setError('La contraseña debe tener al menos 6 caracteres');
    return;
  }

  try {
    const resp = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, correo, contraseña }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      setError(data.mensaje || 'Error al registrarse');
      return;
    }

    localStorage.setItem('token', data.token);
    navigate('/dashboard');
  } catch (err) {
    console.error(err);
    setError('Error al conectar con el servidor');
  } finally {
      setLoading(false);  // <-- Finaliza carga
    }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label htmlFor="nombre" className="block mb-1 font-medium">Nombre</label>
    <input
      id="nombre"
      type="text"
      placeholder="Tu nombre completo"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      className="w-full p-2 border rounded"
      required
    />
  </div>
  <div>
    <label htmlFor="correo" className="block mb-1 font-medium">Correo</label>
    <input
      id="correo"
      type="email"
      placeholder="ejemplo@correo.com"
      value={correo}
      onChange={(e) => setCorreo(e.target.value)}
      className="w-full p-2 border rounded"
      required
    />
  </div>
  <div>
    <label htmlFor="contraseña" className="block mb-1 font-medium">Contraseña</label>
    <input
      id="contraseña"
      type="password"
      placeholder="Mínimo 6 caracteres"
      value={contraseña}
      onChange={(e) => setContraseña(e.target.value)}
      className="w-full p-2 border rounded"
      required
    />
  </div>

  {error && <p className="text-red-500 text-sm">{error}</p>}

  <button
    type="submit"
    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-60"
    disabled={loading}
  >
    {loading ? 'Registrando...' : 'Registrarse'}
  </button>
</form>

    </div>
  );
}
