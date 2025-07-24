import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold text-cyan-400">RIOTEC</div>
      <div className="flex space-x-4">
        <a href="/" className="hover:text-cyan-400 transition">Inicio</a>
        <a href="/login" className="hover:text-cyan-400 transition">Login</a>
        <a href="/register" className="hover:text-cyan-400 transition">Registro</a>
        <a href="/dashboard" className="hover:text-cyan-400 transition">Dashboard</a>
        <a href="/usuarios" className="hover:text-cyan-400 transition">Usuarios</a>
      </div>
    </nav>

  );
};

export default Navbar;
