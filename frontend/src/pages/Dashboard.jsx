import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

function Dashboard() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-green-400 mb-4">Bienvenido al Dashboard</h1>

        {token ? (
          <>
            <p className="text-green-300 text-lg mb-6">Tu sesión está activa. Puedes gestionar tu cuenta aquí.</p>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition-colors"
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </>
        ) : (
          <p className="text-red-400 mt-2">No has iniciado sesión.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
