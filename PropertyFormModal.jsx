import { useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"

const initialForm = {
  title: "",
  location: "",
  price: "",
  surface_m2: "",
  bedrooms: "",
  bathrooms: "",
  parking: "",
  pool: false,
  year_built: "",
  description: "",
  images: "",
}

// Modal reutilizado tanto para crear como para editar una propiedad.
// Sigue el mismo patrón que UserFormModal.jsx de la guía de CRUD de usuarios:
// "selectedProperty" indica si estamos editando (con datos precargados) o creando.
function PropertyFormModal({ show, handleClose, handleSave, selectedProperty }) {
  const [formData, setFormData] = useState(initialForm)

  useEffect(() => {
    if (selectedProperty) {
      setFormData({
        title: selectedProperty.title || "",
        location: selectedProperty.location || "",
        price: selectedProperty.price ?? "",
        surface_m2: selectedProperty.surface_m2 ?? "",
        bedrooms: selectedProperty.bedrooms ?? "",
        bathrooms: selectedProperty.bathrooms ?? "",
        parking: selectedProperty.parking ?? "",
        pool: Boolean(selectedProperty.pool),
        year_built: selectedProperty.year_built ?? "",
        description: selectedProperty.description || "",
        images: Array.isArray(selectedProperty.images)
          ? selectedProperty.images.join("\n")
          : selectedProperty.images || "",
      })
    } else {
      setFormData(initialForm)
    }
  }, [selectedProperty, show])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const payload = {
      ...formData,
      price: Number(formData.price) || 0,
      surface_m2: Number(formData.surface_m2) || 0,
      bedrooms: Number(formData.bedrooms) || 0,
      bathrooms: Number(formData.bathrooms) || 0,
      parking: Number(formData.parking) || 0,
      year_built: formData.year_built ? Number(formData.year_built) : null,
      images: formData.images
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean),
    }

    handleSave(payload)
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="font-display">
          {selectedProperty ? "Editar propiedad" : "Nueva propiedad"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de la propiedad</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Precio (CLP)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Comuna, ciudad"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Superficie (m²)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  name="surface_m2"
                  value={formData.surface_m2}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Dormitorios</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Baños</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Estacionamientos</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Año de construcción</Form.Label>
                <Form.Control
                  type="number"
                  name="year_built"
                  value={formData.year_built}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={8} className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                id="pool-check"
                name="pool"
                label="Cuenta con piscina"
                checked={formData.pool}
                onChange={handleChange}
                className="mt-3"
              />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>
              Imágenes <span className="text-muted">(una URL por línea)</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="images"
              placeholder="https://...jpg"
              value={formData.images}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" className="btn-outline-cacao" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" className="btn-cacao">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default PropertyFormModal
