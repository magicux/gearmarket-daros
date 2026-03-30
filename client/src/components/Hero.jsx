import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero-section rounded-4 overflow-hidden text-white">
      <div className="row g-0 align-items-center">
        <div className="col-lg-7 p-4 p-md-5">
          <span className="badge bg-light text-primary mb-3">Compra y vende equipamiento deportivo</span>
          <h1 className="display-5 fw-bold mb-3">Encuentra tu próximo equipo en un marketplace hecho para deportistas</h1>
          <p className="lead text-white-50 mb-4">
            Publicaciones ordenadas, categorías especializadas y una experiencia simple para descubrir productos usados o seminuevos.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Link className="btn btn-warning btn-lg" to="/galeria">
              Explorar galería
            </Link>
            <Link className="btn btn-outline-light btn-lg" to="/registro">
              Quiero vender
            </Link>
          </div>
        </div>
        <div className="col-lg-5 p-4 p-md-5 bg-hero-aside">
          <div className="hero-card p-4 rounded-4 bg-white text-dark shadow-lg">
            <h2 className="h4 fw-bold mb-3">¿Qué encontrarás?</h2>
            <ul className="list-unstyled mb-0 d-grid gap-3">
              <li>⚡ Búsqueda rápida por categoría y ubicación</li>
              <li>💚 Favoritos para guardar tus hallazgos</li>
              <li>🧭 Rutas públicas y privadas con protección</li>
              <li>📦 Preparado para consumo real de API REST</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
