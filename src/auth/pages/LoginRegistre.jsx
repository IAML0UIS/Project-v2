import { useState } from "react"
import { Bienvenido, Login, Registro } from "../pages";



export const LoginRegistre = () => {

  const [isToggled, setIsToggled] = useState(false);
  
  const handleToggle = () => {
    setIsToggled(prev => !prev);
  };
  
  return (
    <>
      <div className="content login-container">
      
        <div 
          className={`container ${ isToggled ? 'toggle' : ''} content`}
          >
          {/* INICIAR SESION */}
          <Login />
  

          {/* Registrarse */}
          <Registro />

          {/* Bienvenido VitalSave */}
          <Bienvenido 
            isToggled={ isToggled }
            handleToggle={ handleToggle}/>
        </div>
      </div>
    </>
  )
}
