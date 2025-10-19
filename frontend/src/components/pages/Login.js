import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    //fondo
    <div className="d-flex justify-content-center align-items-center vh-100 bs-body-bg"
      style={{backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#a7c6efff",
      }}
      >
      <div className="d-flex justify-content-center align-items-center vh-100 bs-body-bg">
        <div className="card p-5 shadow"  //formulario
        style={{                    
            width: "500px",
            height:"450px",
            transform: "translateX(-400px)",
            borderRadius: "12px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
        }}
        
        >
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
            ¿No tienes cuenta? <a href="/registro">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

