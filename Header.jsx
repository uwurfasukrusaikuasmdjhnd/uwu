import { Container, Form } from "react-bootstrap"

// Cabecera de la SPA: presenta la marca "Estates & Co." y alberga el buscador
// en tiempo real (requisito 3.4). Vive en un único componente porque, en este
// catálogo, la búsqueda es la acción principal de la página de entrada.
function Header({ searchTerm, onSearchChange, resultsCount, totalCount }) {
  return (
    <header className="hero-band">
      <Container>
        <span className="hero-eyebrow">Estates & Co. — Curaduría inmobiliaria</span>
        <h1 className="hero-title">Catálogo de Propiedades</h1>
        <div className="gold-divider" style={{ maxWidth: 220 }}>
          <span className="gem" />
        </div>
        <p className="hero-subtitle">
          Explora residencias seleccionadas, revisa el detalle de cada propiedad y
          gestiona el catálogo completo desde un solo lugar.
        </p>

        <div className="search-shell d-flex align-items-center gap-2">
          <i className="bi bi-search" aria-hidden="true" />
          <Form.Control
            type="search"
            placeholder="Buscar por nombre, comuna o ubicación…"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Buscar propiedades"
          />
        </div>
        <p className="search-results-note">
          {searchTerm
            ? `${resultsCount} de ${totalCount} propiedades coinciden con "${searchTerm}"`
            : `${totalCount} propiedades disponibles`}
        </p>
      </Container>
    </header>
  )
}

export default Header
