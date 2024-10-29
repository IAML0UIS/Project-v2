import { Navigate, Route, Routes } from "react-router"
import { Admin } from "../src/layouts/Admin";
import { LoginRegistre, OlvidasteContra } from "./auth/pages";
import { useCheckAuth } from "./variables/useCheckAuth";



export const VitalSave = () => {
  
  const { status } = useCheckAuth()

  return (
    <Routes>
      {
        (status === 'authenticated') 
        ? (
          <>
            {/* Rutas protegidas para usuarios autenticados */}
            <Route path="/inicio/*" element={ <Admin /> } />  
            <Route path="/*" element={ <Navigate to="/inicio" replace /> } />
          </>
        ) : (
          <>
            {/* Rutas públicas para usuarios no autenticados */}
            <Route path="/login" element={ <LoginRegistre /> } />  
            <Route path="/olvidaste-contra" element={ <OlvidasteContra /> } />
            <Route path="/*" element={ <Navigate to="/login" replace /> } />
          </>
        )
      }
    </Routes>
  )
}
