import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="text-center py-5">
      <div className="display-2 fw-bold text-primary">404</div>
      <h1 className="fw-bold mt-3">Ruta no encontrada</h1>
      <p className="text-body-secondary mb-4">
        La página que buscas no existe o fue movida dentro del proyecto.
      </p>
      <Link className="btn btn-primary" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFoundPage;
