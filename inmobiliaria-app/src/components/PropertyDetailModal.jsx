import { Badge, Button, Carousel, Modal } from "react-bootstrap"
import { formatCurrency, getImageList } from "../utils/format"

// Modal de detalle. Cumple 3.3: título, galería (Carousel de Bootstrap),
// descripción y un set de íconos representativos para superficie, dormitorios,
// baños, piscina (condicional) y estacionamientos, además de un atributo extra
// (año de construcción) cuando está disponible.
function PropertyDetailModal({ show, property, onHide, onEdit }) {
  if (!property) return null
  const images = getImageList(property)

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="font-display">
          {property.title}
          <Badge bg="" className="ms-2" style={{ background: "var(--oro)", color: "#3b2a20" }}>
            {formatCurrency(property.price)}
          </Badge>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="property-location mb-3">
          <i className="bi bi-geo-alt-fill" /> {property.location}
        </p>

        {images.length > 0 ? (
          <Carousel className="detail-carousel" interval={null}>
            {images.map((src, index) => (
              <Carousel.Item key={src + index}>
                <img src={src} alt={`${property.title} - foto ${index + 1}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div className="no-image" style={{ height: 220, borderRadius: 12 }}>
            <i className="bi bi-image" />
          </div>
        )}

        <div className="gold-divider dark">
          <span className="gem" />
        </div>

        <p className="detail-description">
          {property.description || "Esta propiedad aún no tiene una descripción registrada."}
        </p>

        <div className="attribute-grid">
          <div className="attribute-pill">
            <i className="bi bi-rulers" />
            <span className="value">{property.surface_m2 ?? "—"} m²</span>
            <span className="label">Superficie</span>
          </div>
          <div className="attribute-pill">
            <i className="bi bi-door-closed" />
            <span className="value">{property.bedrooms ?? "—"}</span>
            <span className="label">Dormitorios</span>
          </div>
          <div className="attribute-pill">
            <i className="bi bi-droplet" />
            <span className="value">{property.bathrooms ?? "—"}</span>
            <span className="label">Baños</span>
          </div>
          <div className="attribute-pill">
            <i className="bi bi-p-circle" />
            <span className="value">{property.parking ?? 0}</span>
            <span className="label">Estacionamientos</span>
          </div>
          {property.pool ? (
            <div className="attribute-pill">
              <i className="bi bi-water" />
              <span className="value">Sí</span>
              <span className="label">Piscina</span>
            </div>
          ) : null}
          {property.year_built ? (
            <div className="attribute-pill">
              <i className="bi bi-calendar3" />
              <span className="value">{property.year_built}</span>
              <span className="label">Año construcción</span>
            </div>
          ) : null}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" className="btn-outline-cacao" onClick={onHide}>
          Cerrar
        </Button>
        <Button
          className="btn-cacao"
          onClick={() => {
            onHide()
            onEdit(property)
          }}
        >
          <i className="bi bi-pencil-square me-2" />
          Editar propiedad
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PropertyDetailModal
