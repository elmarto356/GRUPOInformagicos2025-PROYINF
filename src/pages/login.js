import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bs-body-bg">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa tu correo"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center mt-3">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default App;

