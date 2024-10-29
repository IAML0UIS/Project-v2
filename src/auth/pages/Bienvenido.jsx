
export const Bienvenido = ({ isToggled, handleToggle }) => {
  return (
    <>
        <div className="container-welcome">
        <div className="welcome-sign-up welcome">
            <h2>¡Bienvenido VitalSave!</h2>
            <p>
            Ingrese sus datos personales para usar todas las funciones del sitio
            </p>
            <button className="button" onClick={ handleToggle }>
            { isToggled ? '' : 'Registrarse' }
            </button>
        </div>
        <div className="welcome-sign-in welcome">
            <h3>¡Hola!</h3>
            <p>
            Regístrese con sus datos personales para usar todas las funciones de VitalSave
            </p>
            <button className="button" onClick={ handleToggle }>
            { isToggled ? 'Iniciar Sesion' : '' }
            </button>
        </div>
    </div>
    </>
  )
}
