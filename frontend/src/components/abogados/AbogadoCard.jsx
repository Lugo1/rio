const AbogadoCard = ({ abogado }) => {
  return (
    <div className="bg-white text-black shadow-md rounded-xl p-6 w-full flex flex-col items-center text-center">
      <img
        src={abogado.foto}
        alt={abogado.nombre}
        className="w-32 h-32 rounded-full mx-auto object-cover"
      />
      <h2 className="text-xl font-semibold mt-4 text-center">{abogado.nombre}</h2>
      <p className="text-center text-sm text-gray-600">{abogado.especialidad}</p>
      <ul className="text-sm mt-4 space-y-1 text-gray-700">
        <li><strong>Edad:</strong> {abogado.edad}</li>
        <li><strong>Maestría:</strong> {abogado.maestria}</li>
      </ul>
      <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
        Solicitar Consulta
      </button>
    </div>
  );
};

export default AbogadoCard;
