import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center justify-center px-4"
    >
      {/* Logo animado */}
      <motion.img
        src="/logo.png"
        alt="Logo RIOTEC"
        className="w-24 h-24 mx-auto mb-4 rounded-full border border-gray-700 shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Título y subtítulo */}
      <motion.h1
        className="text-5xl font-extrabold tracking-wide text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        RIOTEC
      </motion.h1>
      <motion.p
        className="text-gray-300 mt-2 text-lg italic text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Soluciones tecnológicas profesionales
      </motion.p>

      {/* Botones */}
      <div className="flex space-x-6 mt-10">
        <Link to="/login">
          <Button variant="primary">Iniciar Sesión</Button>
        </Link>
        <Link to="/register">
          <Button variant="outline">Registrarse</Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Home;

