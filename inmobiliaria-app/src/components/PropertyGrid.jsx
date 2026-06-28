import { Col, Row, Spinner } from "react-bootstrap"
import PropertyCard from "./PropertyCard"

function PropertyGrid({ properties, loading, onOpenDetail, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="feedback-state">
        <Spinner animation="border" style={{ color: "var(--cacao)" }} />
        <p className="mt-3 mb-0">Cargando propiedades…</p>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="empty-state">
        <i className="bi bi-binoculars" />
        <h5>No encontramos propiedades</h5>
        <p className="mb-0">Prueba con otro nombre, comuna o ubicación.</p>
      </div>
    )
  }

  return (
    <Row className="g-4">
      {properties.map((property) => (
        <Col key={property.id} xs={12} sm={6} lg={4}>
          <PropertyCard
            property={property}
            onOpenDetail={onOpenDetail}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Col>
      ))}
    </Row>
  )
}

export default PropertyGrid
