function Dashboard() {
  const token = localStorage.getItem('token');

  return (
    <div className="p-6">
      <h1 className="text-2xl text-white">Bienvenido al Dashboard</h1>
      {token ? (
        <p className="text-green-400 mt-2">Tu sesión está activa.</p>
      ) : (
        <p className="text-red-400 mt-2">No has iniciado sesión.</p>
      )}
    </div>
  );
}

export default Dashboard;
