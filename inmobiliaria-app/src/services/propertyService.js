import mockProperties from "../data/mockProperties"

// ============================================================
// CONFIGURACIÓN DEL BACKEND
// ============================================================
// Reemplaza esta URL por la que entrega tu archivo PHP conectado
// a la base de datos de evaluaciones anteriores.
//
// Recomendado: define VITE_API_URL en un archivo .env (ver .env.example)
// para no tener que tocar el código al pasar de desarrollo a la
// instancia de AWS (Ubuntu Server):
//
//   VITE_API_URL=http://localhost/api/propiedades.php          (desarrollo local)
//   VITE_API_URL=http://TU_IP_PUBLICA_AWS/api/propiedades.php  (producción)
//
const API_URL = import.meta.env.VITE_API_URL || "http://localhost/api/propiedades.php"

// Mientras configuras el backend real, la app sigue funcionando con
// datos de demostración (ver src/data/mockProperties.js).
const FALLBACK_TO_MOCK = true

function getToken() {
  return localStorage.getItem("token")
}

function getHeaders() {
  const headers = { "Content-Type": "application/json" }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

// El backend PHP puede responder como arreglo plano [...] o como
// { ok: true, data: [...] }. Esta función normaliza ambos casos.
function normalizeList(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.data)) return payload.data
  return []
}

function normalizeItem(payload) {
  if (payload && payload.data) return payload.data
  return payload
}

// ------------------------------------------------------------
// LISTAR propiedades — usado en useEffect al montar el catálogo
// ------------------------------------------------------------
export async function getProperties() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`El backend respondió con estado ${response.status}`)
    }

    const payload = await response.json()
    return { data: normalizeList(payload), fromBackend: true }
  } catch (error) {
    console.warn(
      "[propertyService] No se pudo conectar al backend PHP. Detalle:",
      error.message
    )
    if (FALLBACK_TO_MOCK) {
      return { data: mockProperties, fromBackend: false }
    }
    throw error
  }
}

// ------------------------------------------------------------
// CREAR propiedad (POST) — opcional / bonus según la pauta
// ------------------------------------------------------------
export async function createProperty(propertyData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(propertyData),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || "Error al crear la propiedad")
  }

  return normalizeItem(data)
}

// ------------------------------------------------------------
// ACTUALIZAR propiedad (PUT) — opcional / bonus según la pauta
// ------------------------------------------------------------
export async function updateProperty(id, propertyData) {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(propertyData),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar la propiedad")
  }

  return normalizeItem(data)
}

// ------------------------------------------------------------
// ELIMINAR propiedad (DELETE) — opcional / bonus según la pauta
// ------------------------------------------------------------
export async function deleteProperty(id) {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Error al eliminar la propiedad")
  }

  return true
}

export { API_URL }
