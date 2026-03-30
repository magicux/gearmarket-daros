import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { usePublications } from '../hooks/usePublications';

function HomePage() {
  const { publications, toggleFavorite } = usePublications();
  const featured = publications.slice(0, 3);

  return (
    <div className="d-grid gap-5">
      <Hero />

      <section>
        <SectionTitle
          eyebrow="Destacados"
          title="Artículos recomendados"
          description="Muestra dinámica con tarjetas reutilizables y datos listos para API."
        />

        <div className="row g-4">
          {featured.map((publication) => (
            <div key={publication.id} className="col-md-6 col-xl-4">
              <ProductCard publication={publication} onToggleFavorite={toggleFavorite} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
