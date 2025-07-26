import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/register", label: "Registro" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/usuarios", label: "Usuarios" },
    { to: "/contacto", label: "Contáctanos" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 border-b border-white/10 transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-lg bg-[#0f1c1e]/90 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        {/* Logo animado */}
        <motion.h1
          className="text-2xl font-bold text-[#3eea91]"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          LEXLINE
        </motion.h1>

        {/* Enlaces desktop */}
        <div className="hidden md:flex space-x-6 text-sm font-medium items-center">
          {links.map(({ to, label }) => (
            <motion.div
              key={to}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={to}
                className="hover:text-[#4df7a5] transition-colors duration-200"
              >
                {label}
              </Link>
            </motion.div>
          ))}

          {/* Botón login */}
          <Link
            to="/login"
            className="ml-4 px-4 py-1.5 rounded-full bg-[#3eea91] text-[#0f1c1e] font-semibold text-sm shadow-md hover:bg-[#4df7a5] transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>

        {/* Menú móvil */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú desplegable móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#0f1c1e]/95 text-white px-6 pb-4"
          >
          <ul className="flex flex-col items-center justify-center gap-4 mt-4 text-center">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className="no-underline text-[#3eea91] hover:text-[#4df7a5] text-lg font-semibold tracking-wide uppercase transition duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Botón login en móvil */}
            <li>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="no-underline inline-block text-center px-7 py-3 rounded-xl bg-[#3eea91] text-[#0f1c1e] font-semibold mt-2 shadow-md hover:bg-[#4df7a5] transition-colors duration-200"
              >
                Iniciar sesión
              </Link>
            </li>
          </ul>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
