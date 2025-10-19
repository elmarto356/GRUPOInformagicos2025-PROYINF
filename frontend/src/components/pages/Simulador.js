import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

function Simulador() {
  const [monto, setMonto] = useState("");
  const [cuotas, setCuotas] = useState(""); // en meses
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const formatMonto = (value) => {
    const numericValue = (value || "").replace(/\D/g, "");
    return new Intl.NumberFormat("es-CL").format(numericValue);
  };

  const handleMontoChange = (e) => setMonto(formatMonto(e.target.value));
  const parseAmount = (str) => Number((str || "0").replace(/\./g, ""));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const amount = parseAmount(monto);
      const months = Number(cuotas);

      if (!Number.isFinite(amount) || amount <= 0)
        throw new Error("Ingrese un monto válido.");
      if (!Number.isFinite(months) || months < 6 || months > 60)
        throw new Error("El número de cuotas debe estar entre 6 y 60.");

      const res = await fetch("/api/simulations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, months }),
      });

      const raw = await res.text();
      if (!res.ok)
        throw new Error(
          `HTTP ${res.status} ${res.statusText}. Respuesta: ${
            raw?.slice(0, 200) || "(vacío)"
          }`
        );

      const data = raw ? JSON.parse(raw) : null;
      if (!data?.ok) throw new Error("La API no devolvió 'ok'.");

      navigate("/resultado-simulacion", {
        state: {
          ok: data.ok,
          input: { amount, months },
          rate: data.rate,
          result: data.result,
          notes: data.notes || [],
        },
        replace: true,
      });
    } catch (e) {
      setErr(e.message || "Error desconocido.");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = Boolean(monto && cuotas);

  return (
    //fondo
    <div className="d-flex justify-content-center align-items-center vh-100 bs-body-bg"
      style={{backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#d9dfe7ff",
            }}>

      <div className="d-flex align-items-center p-4"   //imagen fondo
        style={{ 
          backgroundImage: "url('/images/fondoprueba.png')",  //agregar imagen motivante
          transform: "translateX(700px)",
          background: "#a4c9f9ff", 
          borderRadius: "12px", 
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)", 
          width: "45%", 
          height:"100%"
      }}
    ></div>

      <div className="card p-5 shadow"    //formulario credito
        style={{
          width: "550px",
          transform: "translateX(-900px)",
          borderRadius: "12px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
      }}>

        <h3 className="text-center mb-4" 
          style={{color:'rgba(42, 54, 159, 1)'}}
          >
          Crédito de Consumo Digital
          </h3>

        <h5 className="text-center mb-2" 
        style={{ fontWeight: "normal" }}
        >
        Solicítalo 100% online y recibe respuesta en minutos
        </h5>
        <form onSubmit={handleSubmit}>
          {/* Monto */}
          <div className="mb-3">
            <label htmlFor="monto" className="form-label">Monto (CLP)</label>
            <input
              type="text"
              className="form-control"
              id="monto"
              placeholder="Ej: 1.000.000"
              value={monto}
              onChange={handleMontoChange}
              inputMode="numeric"
              required
            />
            <div className="form-text">
              Monto permitido: entre $100.000 y $50.000.000.
            </div>
          </div>

          {/* Cuotas */}
          <div className="mb-3">
            <label htmlFor="cuotas" className="form-label">Cuotas (meses)</label>
            <input
              type="number"
              className="form-control"
              id="cuotas"
              placeholder="Ej: 12"
              min="6"
              max="60"
              value={cuotas}
              onChange={(e) => setCuotas(e.target.value)}
              required
            />
            <div className="form-text">Entre 6 y 60 meses.</div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!canSubmit || loading}
          >
            {loading ? "Calculando..." : "Simular"}
          </button>
        </form>

        {err && <div className="alert alert-danger mt-3 text-center">{err}</div>}

        <p className="text-center mt-3">
          ¿No tienes cuenta? <a href="/registro">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default Simulador;
