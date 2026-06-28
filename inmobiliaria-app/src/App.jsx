import { useEffect, useMemo, useState } from "react"
import { Button, Container } from "react-bootstrap"
import Swal from "sweetalert2"

import Header from "./components/Header"
import PropertyGrid from "./components/PropertyGrid"
import PropertyDetailModal from "./components/PropertyDetailModal"
import PropertyFormModal from "./components/PropertyFormModal"
import {
  createProperty,
  deleteProperty,
  getProperties,
  updateProperty,
  API_URL,
} from "./services/propertyService"

function App() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [detailProperty, setDetailProperty] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  const [formProperty, setFormProperty] = useState(null)
  const [showForm, setShowForm] = useState(false)

  // 3.1 — Carga de datos desde el backend con useEffect + fetch (dentro del servicio).
  useEffect(() => {
    let active = true

    async function loadProperties() {
      setLoading(true)
      try {
        const { data, fromBackend } = await getProperties()
        if (!active) return
        setProperties(data)
        setUsingFallback(!fromBackend)
      } catch (error) {
        if (!active) return
        Swal.fire("Error", error.message || "No se pudieron cargar las propiedades", "error")
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProperties()
    return () => {
      active = false
    }
  }, [])

  // 3.4 — Búsqueda en tiempo real sobre los datos ya cargados (sin recargar la página).
  const filteredProperties = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return properties
    return properties.filter((property) =>
      [property.title, property.location]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    )
  }, [properties, searchTerm])

  function openDetail(property) {
    setDetailProperty(property)
    setShowDetail(true)
  }

  function openCreateForm() {
    setFormProperty(null)
    setShowForm(true)
  }

  function openEditForm(property) {
    setFormProperty(property)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setFormProperty(null)
  }

  // 3.5 — Edición de propiedades: se refleja al instante en el estado de React
  // y, además, se intenta persistir contra el backend PHP (bonus) sin bloquear la UI.
  // 3.5 / 3.6 también cubren la creación, reutilizando el mismo flujo de guardado.
  async function handleSaveProperty(formData) {
    if (formProperty) {
      const updated = { ...formProperty, ...formData, id: formProperty.id }
      setProperties((prev) => prev.map((p) => (p.id === formProperty.id ? updated : p)))

      try {
        await updateProperty(formProperty.id, formData)
      } catch (error) {
        console.warn("[App] No se pudo sincronizar la edición con el backend:", error.message)
      }

      Swal.fire("Actualizada", "La propiedad se actualizó correctamente.", "success")
    } else {
      const temporaryId = `local-${Date.now()}`
      const created = { id: temporaryId, ...formData }
      setProperties((prev) => [created, ...prev])

      try {
        const backendResult = await createProperty(formData)
        if (backendResult && backendResult.id) {
          setProperties((prev) =>
            prev.map((p) => (p.id === temporaryId ? { ...p, id: backendResult.id } : p))
          )
        }
      } catch (error) {
        console.warn("[App] No se pudo sincronizar la creación con el backend:", error.message)
      }

      Swal.fire("Creada", "La propiedad se agregó al catálogo.", "success")
    }

    closeForm()
  }

  // 3.6 — Eliminación con confirmación previa (SweetAlert2) y actualización
  // inmediata del estado; intenta además el DELETE contra el backend (bonus).
  async function handleDeleteProperty(property) {
    const result = await Swal.fire({
      title: "¿Eliminar propiedad?",
      text: `Se eliminará "${property.title}" del catálogo.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#8c3b2e",
      cancelButtonColor: "#6f4a33",
    })

    if (!result.isConfirmed) return

    setProperties((prev) => prev.filter((p) => p.id !== property.id))

    try {
      await deleteProperty(property.id)
    } catch (error) {
      console.warn("[App] No se pudo sincronizar la eliminación con el backend:", error.message)
    }

    Swal.fire("Eliminada", "La propiedad fue eliminada del catálogo.", "success")
  }

  return (
    <div className="app-shell">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultsCount={filteredProperties.length}
        totalCount={properties.length}
      />

      <main className="main-content">
        <Container className="catalog-section">
          {usingFallback && !loading && (
            <div className="backend-banner mb-4">
              <i className="bi bi-info-circle-fill" />
              <span>
                No se pudo conectar a <code>{API_URL}</code>, así que estás viendo datos de
                demostración. Configura <code>VITE_API_URL</code> en tu archivo <code>.env</code>{" "}
                para conectar tu backend PHP real (ver README.md).
              </span>
            </div>
          )}

          <div className="section-heading">
            <div>
              <h2>Propiedades disponibles</h2>
              <span className="count-pill">{properties.length} en catálogo</span>
            </div>
            <Button className="btn-cacao" onClick={openCreateForm}>
              <i className="bi bi-plus-lg me-2" />
              Nueva propiedad
            </Button>
          </div>

          <PropertyGrid
            properties={filteredProperties}
            loading={loading}
            onOpenDetail={openDetail}
            onEdit={openEditForm}
            onDelete={handleDeleteProperty}
          />
        </Container>
      </main>

      <footer className="app-footer">
        Estates & Co. — Catálogo construido con React, React-Bootstrap y SweetAlert2.
      </footer>

      <PropertyDetailModal
        show={showDetail}
        property={detailProperty}
        onHide={() => setShowDetail(false)}
        onEdit={openEditForm}
      />

      <PropertyFormModal
        show={showForm}
        handleClose={closeForm}
        handleSave={handleSaveProperty}
        selectedProperty={formProperty}
      />
    </div>
  )
}

export default App
