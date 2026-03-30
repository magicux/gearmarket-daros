import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PublicationForm from '../components/PublicationForm';
import SectionTitle from '../components/SectionTitle';
import { usePublications } from '../hooks/usePublications';

function EditPublicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPublicationById, updatePublication, fetchPublications } = usePublications();

  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadPublication = async () => {
      setLoading(true);
      let data = getPublicationById(id);
      if (!data) {
        await fetchPublications();
        data = getPublicationById(id);
      }
      if (data) {
        setPublication(data);
      }
      setLoading(false);
    };

    loadPublication();
  }, [fetchPublications, getPublicationById, id]);

  const handleUpdate = async (updatedValues) => {
    setSubmitting(true);

    try {
      await updatePublication(id, updatedValues);
      navigate(`/publicaciones/${id}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className='p-5 text-center'>Buscando publicación...</div>;
  if (!publication) return <div className='alert alert-danger'>Error: Publicación no encontrada.</div>;

  return (
    <section className='container py-4'>
      <SectionTitle eyebrow='Modo Editor' title={`Editando: ${publication.title}`} description='Esta vista ya quedó conectada al backend REST del Hito 3.' />

      <PublicationForm onSubmit={handleUpdate} submitting={submitting} initialData={publication} />
    </section>
  );
}

export default EditPublicationPage;
