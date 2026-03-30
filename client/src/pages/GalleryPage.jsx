import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import SectionTitle from '../components/SectionTitle';
import { usePublications } from '../hooks/usePublications';

function GalleryPage() {
  const { filteredPublications, filters, setFilters, toggleFavorite, loading } = usePublications();

  return (
    <section>
      <SectionTitle
        eyebrow="Galería"
        title="Explora publicaciones"
        description="Filtra por texto y categoría usando estado global compartido con Context API."
      />

      <SearchBar filters={filters} onChange={setFilters} />

      {loading ? <div className="alert alert-info">Cargando publicaciones...</div> : null}

      {!loading && filteredPublications.length === 0 ? (
        <EmptyState
          title="No encontramos publicaciones"
          description="Intenta con otra búsqueda o cambia la categoría seleccionada."
        />
      ) : (
        <div className="row g-4">
          {filteredPublications.map((publication) => (
            <div key={publication.id} className="col-md-6 col-xl-4">
              <ProductCard publication={publication} onToggleFavorite={toggleFavorite} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default GalleryPage;
