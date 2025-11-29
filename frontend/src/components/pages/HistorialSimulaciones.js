// src/pages/HistorialSimulaciones.jsx
import React, { useEffect, useState } from "react";

function HistorialSimulaciones({ isLoggedIn }) {
  const [simulaciones, setSimulaciones] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const formatMonto = (value) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(Number(value || 0));

  const formatFecha = (fecha) =>
    new Date(fecha).toLocaleString("es-CL", {
      dateStyle: "short",
      timeStyle: "short",
    });

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchSimulaciones = async () => {
      setLoading(true);
      setErr("");

      try {
        const res = await fetch("/api/historial-simulaciones");
        const raw = await res.text(); // leemos el cuerpo como texto

        let data = null;
        try {
          data = raw ? JSON.parse(raw) : null; // intentamos parsear JSON
        } catch {
          // si no es JSON, data queda null
        }

        if (!res.ok) {
          // si el backend mandó { message: "algo" }, lo usamos
          const msgBackend = data?.message;
          const msgHttp = `HTTP ${res.status} ${res.statusText}`;
          throw new Error(msgBackend ? `${msgHttp} - ${msgBackend}` : msgHttp);
        }

        setSimulaciones(data?.simulations || []);
      } catch (e) {
        console.error("Error al cargar historial:", e);
        setErr(e.message || "Error al cargar el historial.");
      } finally {
        setLoading(false);
      }
    };

    fetchSimulaciones();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="alert alert-warning"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          Debes iniciar sesión para ver tu historial de simulaciones.
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-start vh-100"
      style={{ backgroundColor: "#f5f7fb" }}
    >
      <div className="card mt-4 p-4 shadow-sm" style={{ width: "90%", maxWidth: "1000px" }}>
        <h3 className="text-center mb-4" style={{ color: "rgba(42,54,159,1)" }}>
          Historial de simulaciones
        </h3>

        {loading && <p>Cargando simulaciones...</p>}
        {err && <div className="alert alert-danger">{err}</div>}

        {!loading && !err && simulaciones.length === 0 && (
          <div className="alert alert-info">
            Aún no tienes simulaciones registradas.
          </div>
        )}

        {/* Lista (criterio de aceptación 1) */}
        {simulaciones.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Monto</th>
                  <th>Plazo (meses)</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {simulaciones.map((sim) => (
                  <tr key={sim.id}>
                    <td>{formatFecha(sim.created_at)}</td>
                    <td>{formatMonto(sim.amount)}</td>
                    <td>{sim.months}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setSeleccionada(sim)}
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Detalle (criterio de aceptación 2) */}
        {seleccionada && (
          <div className="mt-4">
            <h5 style={{ color: "rgba(42,54,159,1)" }}>Detalle de la simulación</h5>
            <div className="row mt-2">
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Fecha:</strong> {formatFecha(seleccionada.created_at)}
                  </li>
                  <li className="list-group-item">
                    <strong>Monto:</strong> {formatMonto(seleccionada.amount)}
                  </li>
                  <li className="list-group-item">
                    <strong>Plazo:</strong> {seleccionada.months} meses
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Tasa anual:</strong>{" "}
                    { (Number(seleccionada.annual_rate) * 100).toFixed(2) }%
                  </li>
                  <li className="list-group-item">
                    <strong>Cuota mensual:</strong>{" "}
                    {formatMonto(seleccionada.monthly_payment)}
                  </li>
                  <li className="list-group-item">
                    <strong>Intereses totales:</strong>{" "}
                    {formatMonto(seleccionada.total_interest)}
                  </li>
                  <li className="list-group-item">
                    <strong>Total a pagar:</strong>{" "}
                    {formatMonto(seleccionada.total_to_pay)}
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setSeleccionada(null)}
              >
                Cerrar detalle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistorialSimulaciones;
