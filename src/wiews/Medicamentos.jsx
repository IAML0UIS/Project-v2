import { useState } from "react";
import { MagicMotion } from "react-magic-motion";

// Lista de medicamentos de prueba
const medicamentos = [
  { id: 1, title: "Acetaminofén", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzSmbn4XZ_B_saQ9ifUtuRtDTK6qVh_3_NA&s" },
  { id: 2, title: "Ibuprofeno", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZsoqNzAIawz68QXOPQUiLncTS71tY9LJHjg&s" },
  { id: 3, title: "Paracetamol", imgSrc: "https://w7.pngwing.com/pngs/719/485/png-transparent-acetaminophen-ache-pharmaceutical-drug-fever-grindeks-tablet-electronics-pharmaceutical-drug-gel-thumbnail.png" },
  { id: 4, title: "Aspirina", imgSrc: "https://www.aspirina.com.mx/sites/g/files/vrxlpx53376/files/2024-05/ASPIRINA%20500%20mg%2020%20TABL%20frente.png" },
  { id: 5, title: "Naproxeno", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGG9PPJAD7YBWR9EOSspM9vjLwiYuzTgJdjQ&s" },
  { id: 6, title: "Amoxicilina", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJG4IoIiORa8Z_BFRfYNNYmBwQbiyiYxbOmQ&s" },
  { id: 7, title: "Cefalexina", imgSrc: "https://locatelcolombia.vtexassets.com/arquivos/ids/230127/7702605100613_1_GENFAR-CEFALEXINA-500MG-CAJA-X-10-CAPSULAS.jpg?v=637329333058630000" },
  { id: 8, title: "Clindamicina", imgSrc: "https://santarosadroguerias.vtexassets.com/arquivos/ids/159700/b_7705959012939-7.jpg?v=637732936436270000" },
  { id: 9, title: "Diclofenaco", imgSrc: "https://copservir.vtexassets.com/arquivos/ids/1400454/DICLOFENACO-75-MG-GENFAR_L.png?v=638567969805430000" },
  { id: 10, title: "Cetirizina", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt2nJYcLISARITKg_dTJQZAJ195ChhNpn4Dw&s" },
  { id: 11, title: "Loratradina", imgSrc: "https://copservir.vtexassets.com/arquivos/ids/1253938/LORATADINA-10-MG--GENFAR-_L.png?v=638455311667030000" },
  { id: 12, title: "Metformina", imgSrc: "https://drogueriasunoa.com/cdn/shop/files/imagen_e0749b60-1779-4b22-85fb-5685de191574.png?v=1718999559" },
  { id: 13, title: "Simvastatina", imgSrc: "https://copservir.vtexassets.com/arquivos/ids/1469647/SIMVASTATINA-20-MG--GENFAR-_F.png?v=638644153905230000" },
  { id: 14, title: "Losartán", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhNfVq8xLWh57cnnpUNx3WILMBhOkuFV6LCw&s" },
  { id: 15, title: "Omeprazol", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiwlHIlw7QbQzKLj0roO5_uJrubkAbocfZkg&s" },
  { id: 16, title: "Ranitidina", imgSrc: "https://www.unimarksa.com/sites/default/files/imgproductos/ranitidina-100cap.png" },
  { id: 17, title: "Furosemida", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL-hfMURuYnTz0sYKzDsaDF0jS9_NZR4lr7Q&s" },
  { id: 18, title: "Atorvastatina", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq6zxjvIiBBix01BhUCZNxHG8kL18AI1d_JA&s" },
  { id: 19, title: "Dextrometorfano", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbG2CuL4lx0PGWO2hGeVdxCuvAyEIKmy4GJw&s" },
  { id: 20, title: "Codeína", imgSrc: "https://copservir.vtexassets.com/arquivos/ids/1258479/ACETAMINOFEN-CODEINA-325-30_F.png?v=638457061062600000" },
  { id: 21, title: "Tramadol", imgSrc: "https://locatelcolombia.vtexassets.com/arquivos/ids/366517/7702605111411_1_Tramadol-Genfar-Solucion-Inyectable-Ampolleta-100mg--2ml-X5.png?v=638455291807730000" },
  { id: 22, title: "Glibenclamida", imgSrc: "https://drogueriasantamaria.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MzkwOTg3LCJwdXIiOiJibG9iX2lkIn19--7dafbda1ce23de7e447bbdf587975f02e07ba51a/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fZml0IjpbODAwLDgwMF19LCJwdXIiOiJ2YXJpYXRpb24ifX0=--cef66509c9cdc75663c0eefd9421db1d2ea4fead/nueva-imagen%20-%202022-08-01T121439.590.png?locale=es" },
  { id: 23, title: "Amlodipino", imgSrc: "https://copservir.vtexassets.com/arquivos/ids/1467775/AMLODIPINO-5-MG--GENFAR-_L.png?v=638641369240770000" },
  { id: 24, title: "Clonazepam", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_BGw0kRPEF4SA9we9sXAxv1cZj8FietyUg&s" },
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
        backgroundColor: "#A4C8E1", // Fondo morado oscuro con algo de transparencia
        borderRadius: "8px", // Bordes redondeados
        transition: "transform 0.3s, box-shadow 0.1s", // Transiciones suaves
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)"; // Efecto hover
        e.currentTarget.style.boxShadow = "0 0 30px #4682B4"; // Sombra azul brillante
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
        backgroundColor: "#FFFFFF", // Fondo morado oscuro con algo de transparencia
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
