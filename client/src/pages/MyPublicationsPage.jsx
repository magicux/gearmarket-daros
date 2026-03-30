import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { usePublications } from '../hooks/usePublications';

function MyPublicationsPage() {
  const { myPublications, toggleFavorite } = usePublications();

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <SectionTitle
          eyebrow="Privado"
          title="Mis publicaciones"
          description="Listado filtrado por el usuario autenticado usando Context API."
        />
        <Link className="btn btn-primary mt-2" to="/crear-publicacion">
          Nueva publicación
        </Link>
      </div>

      {myPublications.length === 0 ? (
        <EmptyState
          title="Aún no publicas artículos"
          description="Crea tu primera publicación para comenzar a vender en GearMarket."
        />
      ) : (
        <div className="row g-4">
          {myPublications.map((publication) => (
            <div key={publication.id} className="col-md-6 col-xl-4">
              <ProductCard publication={publication} onToggleFavorite={toggleFavorite} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyPublicationsPage;
