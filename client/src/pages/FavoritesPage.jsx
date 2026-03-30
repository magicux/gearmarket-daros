import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { usePublications } from '../hooks/usePublications';

function FavoritesPage() {
  const { favorites, toggleFavorite } = usePublications();

  return (
    <section>
      <SectionTitle
        eyebrow="Privado"
        title="Mis favoritos"
        description="Vista privada que reutiliza las mismas tarjetas de publicaciones y estado global."
      />

      {favorites.length === 0 ? (
        <EmptyState
          title="Todavía no tienes favoritos"
          description="Agrega publicaciones desde la galería para guardarlas en esta vista."
        />
      ) : (
        <div className="row g-4">
          {favorites.map((publication) => (
            <div key={publication.id} className="col-md-6 col-xl-4">
              <ProductCard publication={publication} onToggleFavorite={toggleFavorite} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoritesPage;
