import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { publicationsService } from '../services/api';
import { formatCurrency } from '../utils/format';
import { useAuth } from '../hooks/useAuth';
import { usePublications } from '../hooks/usePublications';

function ProductDetailPage() {
  const { id } = useParams();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();
  const { getPublicationById, deletePublication } = usePublications();

  useEffect(() => {
    const loadPublication = async () => {
      setLoading(true);

      const localPublication = getPublicationById(id);
      if (localPublication) {
        setPublication(localPublication);
        setLoading(false);
        return;
      }

      try {
        const response = await publicationsService.getById(id);
        setPublication(response.data || null);
      } finally {
        setLoading(false);
      }
    };

    loadPublication();
  }, [getPublicationById, id]);

  const handleDelete = async () => {
    await deletePublication(id);
    navigate('/mis-publicaciones');
  };

  const sellerId = useMemo(() => Number(publication?.seller?.id || publication?.user_id || 0), [publication]);
  const isOwner = sellerId === Number(user?.id);

  const handleOpenContact = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/publicaciones/${id}` } });
      return;
    }

    navigate(`/mensajes?publication=${id}&user=${sellerId}`);
  };

  if (loading) {
    return <div className='alert alert-info'>Cargando detalle...</div>;
  }

  if (!publication) {
    return <div className='alert alert-warning'>No existe la publicación solicitada.</div>;
  }

  return (
    <section className='card border-0 shadow-sm rounded-4 overflow-hidden detail-card'>
      <div className='row g-0'>
        <div className='col-lg-6'>
          <img src={publication.image_url} alt={publication.title} className='detail-image' />
        </div>
        <div className='col-lg-6'>
          <div className='card-body p-4 p-lg-5'>
            <span className='badge detail-badge text-uppercase mb-3'>{publication.category}</span>
            <h1 className='display-6 fw-bold mb-3'>{publication.title}</h1>
            <p className='text-body-secondary'>{publication.description}</p>
            <div className='fs-3 fw-bold text-success mb-3'>{formatCurrency(publication.price)}</div>

            <div className='row row-cols-1 row-cols-sm-2 g-3 mb-4'>
              <div>
                <div className='text-body-secondary small'>Ubicación</div>
                <div className='fw-semibold'>{publication.location}</div>
              </div>
              <div>
                <div className='text-body-secondary small'>Vendedor</div>
                <div className='fw-semibold'>{publication.seller?.name}</div>
              </div>
              <div>
                <div className='text-body-secondary small'>Estado</div>
                <div className='fw-semibold'>{publication.condition}</div>
              </div>
              <div>
                <div className='text-body-secondary small'>Contacto</div>
                <div className='fw-semibold'>Disponible por mensaje</div>
              </div>
            </div>

            <div className='d-flex flex-wrap gap-3 justify-content-end'>
              {isAuthenticated && isOwner ? (
                <>
                  <Link className='btn btn-warning' to={`/editar/${id}`}>
                    Editar publicación
                  </Link>
                  <button className='btn btn-danger' onClick={handleDelete}>
                    Eliminar publicación
                  </button>
                </>
              ) : (
                <>
                  <button className='btn btn-primary' onClick={handleOpenContact}>
                    Contactar al vendedor
                  </button>
                  <Link className='btn btn-outline-primary' to='/galeria'>
                    Volver a la galería
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
