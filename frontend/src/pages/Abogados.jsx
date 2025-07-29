import { useState, useEffect } from 'react';
import AbogadoCard from '../components/abogados/AbogadoCard';
import FiltroBuscador from '../components/abogados/FiltroBuscador';

export default function PruebaLayout() {
  const abogadosData = [
    {
      nombre: "Dra. Ana Pérez",
      foto: "https://randomuser.me/api/portraits/women/65.jpg",
      edad: 38,
      especialidad: "Derecho Penal",
      maestria: "Maestría en Criminología"
    },
    {
      nombre: "Dr. Juan Díaz",
      foto: "https://randomuser.me/api/portraits/men/32.jpg",
      edad: 45,
      especialidad: "Derecho Civil",
      maestria: "Maestría en Derecho Familiar"
    },
    {
      nombre: "Dra. Ana Pérez",
      foto: "https://randomuser.me/api/portraits/women/75.jpg",
      edad: 38,
      especialidad: "Derecho Penal",
      maestria: "Maestría en Criminología"
    },
    {
      nombre: "Dr. Juan Díaz",
      foto: "https://randomuser.me/api/portraits/men/22.jpg",
      edad: 45,
      especialidad: "Derecho Laboral",
      maestria: "Maestría en Derecho Familiar"
    }
    // Puedes agregar más aquí...
  ];

  const [search, setSearch] = useState('');
  const [filtro, setFiltro] = useState('');
  const [abogadosFiltrados, setAbogadosFiltrados] = useState(abogadosData);

  useEffect(() => {
    const resultados = abogadosData.filter((abogado) => {
      const coincideNombre = abogado.nombre.toLowerCase().includes(search.toLowerCase());
      const coincideEspecialidad = filtro ? abogado.especialidad === filtro : true;
      return coincideNombre && coincideEspecialidad;
    });

    setAbogadosFiltrados(resultados);
  }, [search, filtro]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* NavBar aquí si deseas */}

      <div className="flex flex-1">
        {/* Panel lateral */}
        <aside className="w-48 bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Filtros</h2>
          <FiltroBuscador
            search={search}
            setSearch={setSearch}
            filtro={filtro}
            setFiltro={setFiltro}
          />
          <div className="flex flex-col gap-2 mt-4">
            <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Agregar nuevo abogado
            </button>
            <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Ver solo disponibles
            </button>
            <button className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
              Limpiar filtros
            </button>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 bg-white p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Lista de Abogados</h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {abogadosFiltrados.map((abogado, index) => (
              <AbogadoCard key={index} abogado={abogado} />
            ))}
          </div>
        </main>
      </div>

      {/* Footer aquí si deseas */}
    </div>
  );
}

