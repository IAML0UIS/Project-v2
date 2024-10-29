import { useMemo, useState } from "react";
import { useForm } from "../../variables/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { CiWarning } from "react-icons/ci";
const registro = {
  displayName: '',
  email: '',
  password: ''
};

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
};

export const Registro = () => {
  const { formState, displayName, email, password, onInputChange, nombreValid, emailValid, passwordValid, isFormValid } = useForm(registro, formValidations);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth);
  
  const dispatch = useDispatch()

  const onSubmitLogin = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;
    
    dispatch( startCreatingUserWithEmailPassword( formState ) )
  };

  return (
    <div className="container-form my-10">
      <form className="sign-up needs-validation" onSubmit={onSubmitLogin} noValidate>
        <h2>Registrarse</h2>
        <div className="social-networks">
          <ion-icon name="logo-facebook" />
          <ion-icon name="logo-twitter" />
          <ion-icon name="logo-instagram" />
        </div>
        <span>Use su correo electrónico para registrarse</span>

        {/* Input de Nombre */}
        <div className="container mb-3 container-input">
          <ion-icon name="person-outline" />
          <input
            type="text"
            placeholder="Nombre"
            name="displayName"
            value={displayName}
            onChange={onInputChange}
            className={`form-control ${formSubmitted && nombreValid ? 'is-invalid' : ''}`}
            required
          />
          {formSubmitted && nombreValid && <div className="invalid-feedback">{nombreValid}</div>}
        </div>

        {/* Input de Email */}
        <div className="container mb-3 container-input">
          <ion-icon name="mail-outline" />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onInputChange}
            className={`form-control ${formSubmitted && emailValid ? 'is-invalid' : ''}`}
            required
          />
          {formSubmitted && emailValid && <div className="invalid-feedback">{emailValid}</div>}
        </div>

        {/* Input de Password */}
        <div className="container mb-3 container-input">
          <ion-icon name="lock-closed-outline" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onInputChange}
            className={`form-control ${formSubmitted && passwordValid ? 'is-invalid' : ''}`}
            required
          />
          {formSubmitted && passwordValid && <div className="invalid-feedback">{passwordValid}</div>}
        </div>
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
        <button 
          className="button" 
          type="submit"
          // disabled={ isChekingAuthentication } 
          >Crear Cuenta</button>
      </form>
    </div>
  );
};
