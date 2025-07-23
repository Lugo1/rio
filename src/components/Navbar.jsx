import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="font-bold">MiApp</div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Registro</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/usuarios" className="hover:underline">Usuarios</Link>

      </div>
    </nav>
  );
}
