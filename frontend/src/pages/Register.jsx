import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

import { Mail, Lock } from 'lucide-react';
import LabeledInput from '../components/ui/LabeledInput';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

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

    if (!nombre || !correo || !contraseña) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');

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
          Crear cuenta
          </h2>

          <div className="w-full max-w-md flex justify-center">

          {error && (
            <p className="text-red-400 text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Nombre */}
            <LabeledInput
              id="nombre"
              label="Nombre"
              type="text"
              placeholder="Tu nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              icon={FaUser}
            />

            {/* Correo */}
            <LabeledInput
              id="correo"
              label="Correo"
              type="email"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              icon={FaEnvelope}
            />

            {/* Contraseña */}
            <LabeledInput
              id="contraseña"
              label="Contraseña"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
              icon={FaLock}
            />

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrarse'}
              </Button>
            
          </form>
          </div>

          <p className="text-sm text-center text-gray-400 mt-6">
          ¿Ya tienes una cuenta?{' '}
          <a href="/Login" className="text-[var(--color-primary)] hover:underline">
            Inicia sesión
          </a>
          </p>

        </motion.div>

      </Card>
    </div> 

  );
}
