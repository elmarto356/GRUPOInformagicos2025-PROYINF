import React, { useEffect, useMemo, useState } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";

const API_BASE = "";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";


function fmtCLP(n) {
  try { return Number(n).toLocaleString("es-CL"); } catch { return n; }
}
function fmtPct(n, dec = 2) {
  const num = Number(n);
  if (Number.isNaN(num)) return n;
  return `${num.toFixed(dec)}%`;
}
function daysToMonths(days) {
  const m = Math.round(Number(days) / 30);
  return Math.max(6, Math.min(60, m || 0));
}

export default function ResultadoSimulacion() {
  const { state, search } = useLocation();
  const [data, setData] = useState(state || null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const qs = useMemo(() => new URLSearchParams(search), [search]);
  const montoQS = qs.get("monto");
  const tiempoQS = qs.get("cuotas");

  useEffect(() => {
    if (!state && montoQS && tiempoQS) {
      const amount = Number(String(montoQS).replace(/\./g, ""));
      const months = daysToMonths(tiempoQS);
      if (!Number.isFinite(amount) || amount <= 0) {
        setErr("Monto inválido.");
        return;
      }
      setLoading(true);
      setErr("");
      fetch(`${API_BASE}/api/simulations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, months }),
      })
        .then((r) => {
          if (!r.ok) throw new Error("No se pudo obtener la simulación.");
          return r.json();
        })
        .then((json) => {
          setData({
            ok: json.ok,
            input: { amount, months },
            rate: json.rate,
            result: json.result,
            notes: json.notes || [],
          });
        })
        .catch((e) => setErr(e.message))
        .finally(() => setLoading(false));
    }
  }, [state, montoQS, tiempoQS]);

  if (!data && !montoQS && !tiempoQS) {
    return <Navigate to="/simulador-credito" replace />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bs-body-bg">
      <div className="card p-4 shadow" style={{ width: "520px" }}>
        <h3 className="text-center mb-4">Resultado de la simulación</h3>

        {loading && <div className="text-center">Calculando...</div>}
        {err && <div className="alert alert-danger text-center">{err}</div>}

        {data?.ok && (
          <>
            <div className="mb-3">
              <strong>Monto:</strong> ${fmtCLP(data.input.amount)}<br />
              <strong>Cuotas:</strong> {data.input.months}
            </div>

            <div className="mb-3">
              <strong>Tasa anual:</strong> {fmtPct(data.rate.annualRatePct, 2)}<br />
              <strong>Tasa mensual:</strong> {fmtPct(data.rate.monthlyRatePct, 3)}
            </div>

            <div className="mb-3">
              <strong>Cuota mensual (aprox):</strong> ${fmtCLP(data.result.monthlyInstallment)}<br />
              <strong>Total a pagar:</strong> ${fmtCLP(data.result.totalPaid)}<br />
              <strong>Intereses totales:</strong> ${fmtCLP(data.result.totalInterest)}
            </div>

            {Array.isArray(data.notes) && data.notes.length > 0 && (
              <ul className="small">
                {data.notes.map((n, i) => <li key={i}>{n}</li>)}
              </ul>
            )}
          </>
        )}

        <div className="d-flex gap-2 mt-3">
          <Link className="btn btn-secondary w-50" to="/simulador-credito">Nueva simulación</Link>
          <Link className="btn btn-primary w-50" to="/">Inicio</Link>
        </div>
      </div>
    </div>
  );
}
