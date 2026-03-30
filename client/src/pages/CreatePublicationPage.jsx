import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicationForm from '../components/PublicationForm';
import SectionTitle from '../components/SectionTitle';
import { usePublications } from '../hooks/usePublications';

function CreatePublicationPage() {
  const navigate = useNavigate();
  const { createPublication } = usePublications();
  const [submitting, setSubmitting] = useState(false);

  const handleCreatePublication = async (values) => {
    setSubmitting(true);
    try {
      await createPublication(values);
      navigate('/mis-publicaciones');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <SectionTitle
        eyebrow="Formulario"
        title="Crear publicación"
        description="Formulario controlado con react-hook-form, listo para conectar al contrato de backend."
      />

      <PublicationForm onSubmit={handleCreatePublication} submitting={submitting} />
    </section>
  );
}

export default CreatePublicationPage;
