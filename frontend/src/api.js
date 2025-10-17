const BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export async function registerUser(payload) {
  const res = await fetch(`${BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Error al registrar');
  return data; // { ok, data:{...} }
}