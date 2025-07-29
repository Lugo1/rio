import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-lg bg-[rgba(15,23,42,0.9)] shadow-md" // var(--color-bg-start) con opacidad
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-[var(--color-light)]">
        {/* Logo */}
        <motion.h1
          className="text-2xl font-bold text-[var(--color-primary)]"
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
                className="hover:text-[var(--color-primary-hover)] transition-colors duration-200"
              >
                {label}
              </Link>
            </motion.div>
          ))}

          {/* Botón login */}
          <Link
            to="/login"
            className="ml-4 px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-outline)] font-semibold text-sm shadow-md hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>

        {/* Botón del menú móvil */}
        <button
          className="md:hidden text-black bg-white rounded-md p-2 shadow-md transition duration-200 hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[rgba(15,23,42,0.95)] text-white px-6 pb-4"
          >
            <ul className="flex flex-col items-center justify-center gap-4 mt-4 text-center">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="no-underline text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] text-lg font-semibold tracking-wide uppercase transition duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
