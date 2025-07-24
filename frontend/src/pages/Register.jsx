  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import LabeledInput from '../components/ui/LabeledInput'; // ✅ Usamos el componente reutilizable

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  export default function Register() {
    // 📌 Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // 📤 Manejo del formulario de registro
    const handleSubmit = async (e) => {
      e.preventDefault();

      // 🛑 Validación simple
      if (!nombre || !correo || !contraseña) {
        setError('Todos los campos son obligatorios');
        return;
      }

      if (contraseña.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
      }

      setLoading(true);   // ⏳ Inicia carga
      setError('');       // 🔄 Limpia errores previos

      try {
        const resp = await fetch(`${API_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, correo, contraseña }),
        });

        const data = await resp.json();

        if (!resp.ok) {
          setError(data.mensaje || 'Error al registrarse');
          return;
        }

        // ✅ Guardar token y redirigir al dashboard
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } catch (err) {
        console.error(err);
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);  // ✅ Finaliza carga
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-green-700">
        <div className="w-full max-w-md bg-gray-800 text-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">Crear cuenta</h2>

          {/* 🛑 Error general */}
          {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

          {/* 📝 Formulario de registro */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 👤 Campo nombre */}
            <LabeledInput
              id="nombre"
              label="Nombre"
              type="text"
              placeholder="Tu nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            {/* 📧 Campo correo */}
            <LabeledInput
              id="correo"
              label="Correo"
              type="email"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            {/* 🔒 Campo contraseña */}
            <LabeledInput
              id="contraseña"
              label="Contraseña"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />

            {/* ✅ Botón de envío */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
        </div>
      </div>
    );
  }
