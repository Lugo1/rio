import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../services/authService';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!correo || !contraseña) {
    setError('Correo y contraseña son obligatorios');
    return;
  }

  setLoading(true);   // <-- Empieza carga
  setError('');       // <-- Limpia errores anteriores

  try {
    const resp = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo, contraseña }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      setError(data.mensaje || 'Error al iniciar sesión');
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
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
      placeholder="Tu contraseña"
      value={contraseña}
      onChange={(e) => setContraseña(e.target.value)}
      className="w-full p-2 border rounded"
      required
    />
  </div>

  {error && <p className="text-red-500 text-sm">{error}</p>}

  <button
    type="submit"
    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-60"
    disabled={loading}
  >
    {loading ? 'Cargando...' : 'Entrar'}
  </button>
</form>

    </div>
  );
}
