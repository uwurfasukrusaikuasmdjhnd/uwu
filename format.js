// Formatea números como precios en pesos chilenos (sin decimales).
export function formatCurrency(value) {
  if (value === null || value === undefined || value === "") return "Consultar"
  const number = Number(value)
  if (Number.isNaN(number)) return "Consultar"
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(number)
}

// Normaliza el campo "images", que puede llegar como arreglo, como string
// separado por comas/saltos de línea, o vacío.
export function getImageList(property) {
  if (Array.isArray(property?.images) && property.images.length > 0) {
    return property.images
  }
  if (typeof property?.images === "string" && property.images.trim() !== "") {
    return property.images
      .split(/[\n,]/)
      .map((url) => url.trim())
      .filter(Boolean)
  }
  if (property?.image) return [property.image]
  return []
}
