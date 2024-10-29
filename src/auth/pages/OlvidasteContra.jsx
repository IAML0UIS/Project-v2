
export const OlvidasteContra = () => {
  return (
    <>
      <div className="background">
        <div className="container-form-olvidaste">
          <h2>Olvidaste tu Contraseña</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="custom-input" // Cambiado de form-control a custom-input
                id="email"
                placeholder="Ingresa tu correo"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="button">ENVIAR</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
