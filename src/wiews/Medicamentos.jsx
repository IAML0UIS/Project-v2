import { useState } from "react";
import { MagicMotion } from "react-magic-motion";

// Lista de medicamentos de prueba
const medicamentos = [
  { id: 1, title: "Acetaminofén", imgSrc: "https://via.placeholder.com/150?text=Acetaminofén" },
  { id: 2, title: "Ibuprofeno", imgSrc: "https://via.placeholder.com/150?text=Ibuprofeno" },
  { id: 3, title: "Paracetamol", imgSrc: "https://via.placeholder.com/150?text=Paracetamol" },
  { id: 4, title: "Aspirina", imgSrc: "https://via.placeholder.com/150?text=Aspirina" },
  { id: 5, title: "Naproxeno", imgSrc: "https://via.placeholder.com/150?text=Naproxeno" },
  { id: 6, title: "Amoxicilina", imgSrc: "https://via.placeholder.com/150?text=Amoxicilina" },
  { id: 7, title: "Cefalexina", imgSrc: "https://via.placeholder.com/150?text=Cefalexina" },
  { id: 8, title: "Clindamicina", imgSrc: "https://via.placeholder.com/150?text=Clindamicina" },
  { id: 9, title: "Diclofenaco", imgSrc: "https://via.placeholder.com/150?text=Diclofenaco" },
  { id: 10, title: "Cetirizina", imgSrc: "https://via.placeholder.com/150?text=Cetirizina" },
  { id: 11, title: "Loratradina", imgSrc: "https://via.placeholder.com/150?text=Loratradina" },
  { id: 12, title: "Metformina", imgSrc: "https://via.placeholder.com/150?text=Metformina" },
  { id: 13, title: "Simvastatina", imgSrc: "https://via.placeholder.com/150?text=Simvastatina" },
  { id: 14, title: "Losartán", imgSrc: "https://via.placeholder.com/150?text=Losartán" },
  { id: 15, title: "Omeprazol", imgSrc: "https://via.placeholder.com/150?text=Omeprazol" },
  { id: 16, title: "Ranitidina", imgSrc: "https://via.placeholder.com/150?text=Ranitidina" },
  { id: 17, title: "Furosemida", imgSrc: "https://via.placeholder.com/150?text=Furosemida" },
  { id: 18, title: "Atorvastatina", imgSrc: "https://via.placeholder.com/150?text=Atorvastatina" },
  { id: 19, title: "Dextrometorfano", imgSrc: "https://via.placeholder.com/150?text=Dextrometorfano" },
  { id: 20, title: "Codeína", imgSrc: "https://via.placeholder.com/150?text=Codeína" },
  { id: 21, title: "Tramadol", imgSrc: "https://via.placeholder.com/150?text=Tramadol" },
  { id: 22, title: "Glibenclamida", imgSrc: "https://via.placeholder.com/150?text=Glibenclamida" },
  { id: 23, title: "Amlodipino", imgSrc: "https://via.placeholder.com/150?text=Amlodipino" },
  { id: 24, title: "Clonazepam", imgSrc: "https://via.placeholder.com/150?text=Clonazepam" },
  { id: 25, title: "Alprazolam", imgSrc: "https://via.placeholder.com/150?text=Alprazolam" },
  { id: 26, title: "Sertralina", imgSrc: "https://via.placeholder.com/150?text=Sertralina" },
  { id: 27, title: "Fluoxetina", imgSrc: "https://via.placeholder.com/150?text=Fluoxetina" },
  { id: 28, title: "Citalopram", imgSrc: "https://via.placeholder.com/150?text=Citalopram" },
  { id: 29, title: "Venlafaxina", imgSrc: "https://via.placeholder.com/150?text=Venlafaxina" },
  { id: 30, title: "Bupropión", imgSrc: "https://via.placeholder.com/150?text=Bupropión" },
  { id: 31, title: "Levotiroxina", imgSrc: "https://via.placeholder.com/150?text=Levotiroxina" },
  { id: 32, title: "Amiodarona", imgSrc: "https://via.placeholder.com/150?text=Amiodarona" },
  { id: 33, title: "Fluticasona", imgSrc: "https://via.placeholder.com/150?text=Fluticasona" },
  { id: 34, title: "Budesonida", imgSrc: "https://via.placeholder.com/150?text=Budesonida" },
  { id: 35, title: "Salbutamol", imgSrc: "https://via.placeholder.com/150?text=Salbutamol" },
  { id: 36, title: "Montelukast", imgSrc: "https://via.placeholder.com/150?text=Montelukast" },
  { id: 37, title: "Ciprofloxacino", imgSrc: "https://via.placeholder.com/150?text=Ciprofloxacino" },
  { id: 38, title: "Azitromicina", imgSrc: "https://via.placeholder.com/150?text=Azitromicina" },
  { id: 39, title: "Metronidazol", imgSrc: "https://via.placeholder.com/150?text=Metronidazol" },
  { id: 40, title: "Tetraciclina", imgSrc: "https://via.placeholder.com/150?text=Tetraciclina" },
];
function Medicamento({ title, imgSrc }) {
  return (
    <div
      style={{
        width: "10rem", // Ancho del contenedor del medicamento
        padding: "0.5rem", // Espacio interno
        display: "flex", // Flexbox
        flexDirection: "column", // Dirección de los elementos
        gap: "1rem", // Espacio entre los elementos
        backgroundColor: "rgba(,36, 10, 70 0.9)", // Fondo morado oscuro con algo de transparencia
        borderRadius: "8px", // Bordes redondeados
        transition: "transform 0.3s, box-shadow 0.1s", // Transiciones suaves
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)"; // Efecto hover
        e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 122, 255, 0.9)"; // Sombra azul brillante
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"; // Restablece al tamaño original
        e.currentTarget.style.boxShadow = "none"; // Elimina la sombra
      }}
    >
      <h5
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.1em",
          color: "#fff", // Texto en blanco para contraste
        }}
      >
        {title}
      </h5>
      <img
        alt={`Imagen de ${title}`} // Texto alternativo
        src={imgSrc} // Fuente de la imagen
        style={{
          width: "100%", // Imagen ocupa todo el ancho
          borderRadius: "8px", // Bordes redondeados para la imagen
        }}
      />
    </div>
  );
}
 
export const Medicamentos = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh", // Asegura que el fondo cubra toda la pantalla
        backgroundColor: "rgba(34, 0, 68, 0.9)", // Fondo morado oscuro con algo de transparencia
        padding: "2rem 0", // Espacio interno superior e inferior
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <label
        htmlFor="searchInput"
        style={{
          fontWeight: "bold",
          fontSize: "1.2em",
          color: "#fff", // Texto en blanco para contraste
          marginBottom: "0.5rem",
        }}
      >
        
      </label>
      <input
        id="searchInput"
        placeholder="Ingresa el nombre del medicamento"
        type="text"
        maxLength={70}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          marginTop: "7vh",
          backgroundColor: "rgba(238, 238, 238)",
          lineHeight: 1.25,
          width: "18rem",
          padding: "0.75rem",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          textAlign: "center",
          border: "3px solid #ccc",
          borderColor: "rgba( 40, 165, 193  )"
        }}
      />
      <h4
        style={{
          fontWeight: "bold",
          fontSize: "1.2em",
          color: "#fff", // Texto en blanco para contraste
          marginTop: "1.5rem",
        }}
      >
        Lista de Medicamentos
      </h4>
      <MagicMotion>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {medicamentos
            .filter(({ title }) =>
              title.toLowerCase().trim().includes(searchText.toLowerCase().trim())
            )
            .map(({ id, title, imgSrc }) => (
              <Medicamento key={id} title={title} imgSrc={imgSrc} />
            ))}
        </div>
      </MagicMotion>
    </div>
  );
};
