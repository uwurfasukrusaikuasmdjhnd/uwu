import { Button } from "react-bootstrap"
import { formatCurrency, getImageList } from "../utils/format"

// Tarjeta de propiedad. Cumple 3.2: foto principal, título, ubicación y precio,
// y al hacer clic abre el modal de detalle (onOpenDetail).
// Las acciones de Editar / Eliminar (3.5 / 3.6) viven en el pie de la tarjeta.
function PropertyCard({ property, onOpenDetail, onEdit, onDelete }) {
  const images = getImageList(property)
  const mainImage = images[0]

  return (
    <div
      className="property-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpenDetail(property)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpenDetail(property)
      }}
    >
      <div className="property-media">
        {mainImage ? (
          <img src={mainImage} alt={property.title} loading="lazy" />
        ) : (
          <div className="no-image">
            <i className="bi bi-house" />
          </div>
        )}
        <span className="price-seal">{formatCurrency(property.price)}</span>
      </div>

      <div className="card-body-custom">
        <h3 className="property-title">{property.title}</h3>
        <div className="property-location">
          <i className="bi bi-geo-alt-fill" />
          <span>{property.location}</span>
        </div>

        <div className="stat-row">
          <span className="stat">
            <i className="bi bi-rulers" />
            {property.surface_m2 ?? "—"} m²
          </span>
          <span className="stat">
            <i className="bi bi-door-closed" />
            {property.bedrooms ?? "—"}
          </span>
          <span className="stat">
            <i className="bi bi-droplet" />
            {property.bathrooms ?? "—"}
          </span>
          {property.pool ? (
            <span className="stat">
              <i className="bi bi-water" />
              Piscina
            </span>
          ) : null}
        </div>

        <div
          className="card-admin-actions"
          onClick={(event) => event.stopPropagation()}
        >
          <Button
            size="sm"
            variant="outline-secondary"
            className="btn-outline-cacao"
            onClick={() => onEdit(property)}
          >
            <i className="bi bi-pencil-square me-1" />
            Editar
          </Button>
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => onDelete(property)}
          >
            <i className="bi bi-trash3 me-1" />
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
