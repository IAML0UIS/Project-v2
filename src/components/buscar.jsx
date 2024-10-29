import { useState } from "react";

// Componente de búsqueda de medicamentos
const medicamentos = [
  { id: 1, nombre: "Acetaminofén" },
  { id: 2, nombre: "Ibuprofeno" },
  { id: 3, nombre: "Paracetamol" },
  { id: 4, nombre: "Aspirina" },
  { id: 5, nombre: "Loratadina" },
];

const Medicamento = ({ nombre }) => (
  <div style={{ margin: "10px", padding: "10px", border: "1px solid black" }}>
    {nombre}
  </div>
);

export const SearchMedicamentos = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <label htmlFor="searchInput">Buscar Medicamentos:</label>
      <input
        id="searchInput"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Escribe el nombre del medicamento"
        style={{
          padding: "10px",
          margin: "10px 0",
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <div>
        {medicamentos
          .filter((med) =>
            med.nombre.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((med) => (
            <Medicamento key={med.id} nombre={med.nombre} />
          ))}
      </div>
    </div>
  );
};
