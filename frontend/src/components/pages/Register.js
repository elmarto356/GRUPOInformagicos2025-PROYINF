import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = process.env.REACT_APP_API_URL;

function Register() {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    rut: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (form.password !== form.confirmPassword) {
      setMsg("❌ Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rut: form.rut,
          name: form.name,
          lastname: form.lastname,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error al registrar");

      setMsg("Registro exitoso");
      setForm({
        name: "",
        lastname: "",
        rut: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bs-body-bg"
    >
      <div className="card p-4 shadow" style={{ width: 400 }}>

        <h3 className="text-center mb-4">Regístrate</h3>

        {msg && <div className="alert alert-info py-2">{msg}</div>}

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombres</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Ingresa tus nombres"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">Apellidos</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={form.lastname}
              onChange={onChange}
              placeholder="Ingresa tus apellidos"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rut" className="form-label">RUT</label>
            <input
              type="text"
              className="form-control"
              id="rut"
              name="rut"
              value={form.rut}
              onChange={onChange}
              placeholder="11111111-1"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Ingresa tu contraseña"
              required
              minLength={6}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirma contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              placeholder="Repite tu contraseña"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Enviando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
