import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    navigate('/login');               // Redirige al Login
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-white">Bienvenido al Dashboard</h1>

      {token ? (
        <>
          <p className="text-green-400 mt-2">Tu sesión está activa.</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <p className="text-red-400 mt-2">No has iniciado sesión.</p>
      )}
    </div>
  );
}

export default Dashboard;
