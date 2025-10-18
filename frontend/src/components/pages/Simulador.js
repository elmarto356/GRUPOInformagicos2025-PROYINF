import React from "react";

function Simulador() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bs-body-bg">
      <div className="card p-4 shadow" style={{ width: "500px" }}>
        <h3 className="text-center mb-4">Simulacion de credito</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="monto" className="form-label">Monto</label>
            <input
              type="monto"
              className="form-control"
              id="monto"
              placeholder="..."
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cuotas" className="form-label">Cuotas</label>
            <input
              type="cuotas"
              className="form-control"
              id="cuotas"
              placeholder="..."
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tiempo" className="form-label">Tiempo</label>
            <input
              type="tiempo"
              className="form-control"
              id="tiempo"
              placeholder="..."
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Simular
          </button>
        </form>

        <p className="text-center mt-3">
          ¿No tienes cuenta? <a href="/registro">Regístrate</a>
        </p>
      </div>
    </div>
  );
}
export default Simulador; 