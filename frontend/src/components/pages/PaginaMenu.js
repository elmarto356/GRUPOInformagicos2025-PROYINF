import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";


function Menu() {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        gap: "20px",
      }}
    >
      <div className="card p-5 shadow" style={{ width: "750px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4" style={{ color: "rgba(42,54,159,1)" }}>
          Mi menú
        </h3>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link className="btn btn-primary" to="/simulador-interno">
            Nueva Simulación
          </Link>
          <Link className="btn btn-primary" to="/historial-simulaciones">
            Historial de Simulaciones
          </Link>
          <Link className="btn btn-primary" to="/pago-credito">
            Pago de Crédito
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;