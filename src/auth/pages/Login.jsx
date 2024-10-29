import { useDispatch, useSelector } from "react-redux";
import {  startInicioSesionGoogle, startloginWithEmailPassword } from "../../store/auth/thunks";
import { useForm } from "../../variables/useForm";
import { NavLink } from "react-router-dom";
import { CiWarning } from "react-icons/ci";

const ingresar = {
    email: '',
    password: ''
  }
  

export const Login = () => {

    const { email, password, onInputChange } = useForm(ingresar);
    
    const dispatch = useDispatch()
    const { status, errorMessage } = useSelector( state => state.auth );

    const onSubmitLogin = (e) => {
        e.preventDefault();
        dispatch( startloginWithEmailPassword({email, password}))
      };

    const googleInicioSesion = () => {
      console.log('iniciaste sesion con google')
      dispatch( startInicioSesionGoogle( ) );
    }

  return (
    <>
        <div className="container-form">
          <form className="sign-in"  onSubmit={ onSubmitLogin }>
            <h2>Iniciar Sesión</h2>
            <div className="social-networks">
              <ion-icon name="logo-facebook" />
              <ion-icon name="logo-twitter" />
              <ion-icon name="logo-instagram" />
            </div>
            <span>Use su correo y contraseña</span>
            <div className="container mb-3 container-input">
              <ion-icon name="mail-outline" />
              <input 
                type="text" 
                placeholder="Email"
                name="email"
                value={ email }
                onChange={ onInputChange } />
            </div>
            <div className="container mb-3 container-input">
              <ion-icon name="lock-closed-outline" />
              <input 
                type="password" 
                placeholder="Password"
                name="password"
                value={ password }
                onChange={ onInputChange } />
            </div>
            <NavLink to="/olvidaste-contra" className="password-reset-link">¿Olvidaste tu contraseña?</NavLink>
            { errorMessage && (
              <div 
                className="alert alert-danger d-flex align-items-center"  
                role="alert"
              >
                <CiWarning
                  className="bi flex-shrink-0 me-2" 
                  width="24" 
                  height="24" 
                  role="img" 
                  aria-label="Danger"
                />
                <div>
                  <strong>{errorMessage}</strong>
                </div>
              </div>
              )
            }
            <div className="button-container">
              <button className="button" type="submit">INICIAR SESIÓN</button>
              <button className="button" type="button" onClick={ googleInicioSesion }>GOOGLE<ion-icon name="logo-google"/></button>
            </div>
          </form>
        </div>
    </>
  )
}
