import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.DEV
  ? "http://localhost:4000"
  : import.meta.env.VITE_BACKEND_URL;

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
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

         {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading} // <-- botón se desactiva
        >
          {loading ? 'Cargando...' : 'Entrar'}
          
        </button>
      </form>
    </div>
  );
}
