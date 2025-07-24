import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-sm text-gray-400 bg-black/20">
      © {new Date().getFullYear()} RIOTEC. Todos los derechos reservados.
    </footer>
  );
};

export default Footer;
