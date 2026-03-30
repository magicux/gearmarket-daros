import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/format';

function ProductCard({ publication, onToggleFavorite }) {
  return (
    <article className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden product-card">
      <img src={publication.image_url} alt={publication.title} className="product-image" />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between gap-2 mb-2">
          <span className="badge bg-primary-subtle text-primary text-uppercase">{publication.category}</span>
          <button
            type="button"
            className="btn btn-sm btn-light border"
            onClick={() => onToggleFavorite(publication.id)}
          >
            {publication.isFavorite ? '★' : '☆'}
          </button>
        </div>
        <h3 className="h5 fw-bold">{publication.title}</h3>
        <p className="text-body-secondary small flex-grow-1">{publication.description}</p>
        <div className="d-flex justify-content-between align-items-end mb-3 gap-2">
          <div>
            <div className="fw-bold text-success fs-5">{formatCurrency(publication.price)}</div>
            <div className="small text-body-secondary">{publication.location}</div>
          </div>
          <span className="badge text-bg-light">{publication.condition}</span>
        </div>
        <Link className="btn btn-outline-primary w-100" to={`/publicaciones/${publication.id}`}>
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
