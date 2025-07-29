const FiltroBuscador = ({ search, setSearch, filtro, setFiltro }) => {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Buscar abogado por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="">Filtrar por especialidad</option>
        <option value="penal">Derecho Penal</option>
        <option value="civil">Derecho Civil</option>
        <option value="laboral">Derecho Laboral</option>
      </select>
    </div>
  );
};

export default FiltroBuscador;

