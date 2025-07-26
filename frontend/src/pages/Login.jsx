import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

import LabeledInput from '../components/ui/LabeledInput';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md bg-[var(--bg-darker)] shadow-2xl rounded-2xl p-8 border border-gray-700 ">

        <motion.div
          className="max-full bg-white/10 border border-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-10 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--color-primary)]">
          Iniciar sesión
        </h2>

         <div className="w-full max-w-md flex justify-center">

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <LabeledInput
            id="correo"
            label="Correo"
            type="email"
            placeholder="ejemplo@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            icon={Mail}
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

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Cargando...' : 'Entrar'}
          </Button>
        </form>
        </div>

        <p className="text-sm text-center text-gray-400 mt-6">
          ¿No tienes una cuenta?{' '}
          <a href="/register" className="text-[var(--color-primary)] hover:underline">
            Regístrate
          </a>
        </p>
        
      </motion.div>
    </Card>
      
    </div>
  );
}
