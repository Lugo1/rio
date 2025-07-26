import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import logo from "../assets/logo0.png"; // Asegúrate de tener el logo en esta ruta


const Home = () => {
  return (
    <Container>
      <div className="min-h-screen bg-[var(--color-bg)] text-white px-4 ">
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-10 py-20">
          
          {/* Logo estilo Apple */}
          <motion.img
            src={logo}
            alt="Logo LEXLINE"
            className="w-20 h-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />

          {/* Título grande estilo Apple */}
          <motion.h1
            className="text-6xl font-semibold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Bienvenido a LEXLINE
          </motion.h1>

          {/* Subtítulo ligero */}
          <motion.p
            className="text-lg text-neutral-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Soluciones legales modernas y accesibles.
          </motion.p>

          {/* Botones estilo Apple */}
          <motion.div
            className="flex flex-row flex-wrap justify-center items-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link to="/login">
              <Button className="btn-xl" variant="primary">
                Área de Clientes
              </Button>
            </Link>

            <Link to="/register">
              <Button className="btn-xl" variant='outline'>
                Área de Clientes
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
