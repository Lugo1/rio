import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

import LabeledInput from '../components/ui/LabeledInput';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import logo from '../assets/logo0.png'; // Ajusta la ruta si estás en otra carpeta

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

    setLoading(true);
    setError('');

    try {
      const resp = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">

        {/* Columna izquierda (oculta en pantallas pequeñas hidden md:flex) */}
        <aside className="w-48 bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto flex flex-col items-center text-center">
          {/* Imagen */}
          <img
            src={logo}
            alt="Logo de LexLine"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain mb-4"
          />

          {/* Título y descripción */}
          <h1 className="text-2xl font-bold mb-2 text-gray-800">LexLine</h1>
          <p className="text-sm text-gray-600">
            Tu plataforma de consulta legal confiable.
          </p>
        </aside>

        {/* Columna derecha - Formulario de Login */}
        <main className="w-full md:w-1/2 flex items-center justify-center p-6 flex">
          <div className="w-[50vw] h-[60vh] flex flex-col justify-center items-center border border-white rounded-xl p-6 text-white overflow-auto bg-gradient-to-br from-[#ffffff] via-[#203a43] to-[#2c5364]">
            <div className="w-full max-w-xl ">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[var(--color-primary)]">
                Iniciar sesión
              </h2>

              {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 text-black">
                <LabeledInput
                  id="correo"
                  label="Correo"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                  icon={Mail}
                  inputClassName="text-2xl text-black"
                  containerClassName="mb-8"
                  iconClassName="text-black"
                />

                <LabeledInput
                  id="contraseña"
                  label="Contraseña"
                  type="password"
                  placeholder="Tu contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  required
                  icon={Lock}
                />

                <Button type="submit" className="w-full text-lg py-3" disabled={loading}>
                  {loading ? 'Cargando...' : 'Entrar'}
                </Button>
              </form>

              <p className="text-sm text-center text-gray-300 mt-6">
                ¿No tienes una cuenta?{' '}
                <a href="/register" className="text-[var(--color-primary)] hover:underline">
                  Regístrate
                </a>
              </p>
            </div>
          </div>
        </main>

      </div>
    </div>
  );

}
