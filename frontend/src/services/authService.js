const API_URL = import.meta.env.DEV
  ? "http://localhost:4000"
  : import.meta.env.VITE_BACKEND_URL;

export async function loginUsuario(correo, contraseña) {
  const resp = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, contraseña }),
  });

  const data = await resp.json();

  if (!resp.ok) throw new Error(data.mensaje || 'Error al iniciar sesión');
  return data;
}

export async function registrarUsuario(nombre, correo, contraseña) {
  const resp = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, contraseña }),
  });

  const data = await resp.json();

  if (!resp.ok) throw new Error(data.mensaje || 'Error al registrarse');
  return data;
}
