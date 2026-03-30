import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { mockCategories } from '../data/mockData';

function PublicationForm({ onSubmit, submitting, initialData }) {
  const defaultFormValues = {
    title: '',
    description: '',
    price: '',
    image_url: '',
    category: 'ciclismo',
    location: '',
    condition: 'Usado',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialData || defaultFormValues,
  });

  useEffect(() => {
    reset(initialData || defaultFormValues);
  }, [initialData, reset]);

  const submitHandler = async (values) => {
    await onSubmit({ ...values, price: Number(values.price) });

    if (!initialData) {
      reset(defaultFormValues);
    }
  };

  return (
    <form className='card border-0 shadow-sm rounded-4 publication-form' onSubmit={handleSubmit(submitHandler)}>
      <div className='card-body p-4'>
        <div className='row g-3'>
          <div className='col-md-6'>
            <label className='form-label fw-semibold'>Título</label>
            <input className='form-control' {...register('title', { required: 'El título es obligatorio' })} />
            {errors.title ? <small className='text-danger'>{errors.title.message}</small> : null}
          </div>
          <div className='col-md-6'>
            <label className='form-label fw-semibold'>Precio</label>
            <input
              className='form-control'
              type='number'
              {...register('price', {
                required: 'El precio es obligatorio',
                min: { value: 1, message: 'El precio debe ser mayor a 0' },
              })}
            />
            {errors.price ? <small className='text-danger'>{errors.price.message}</small> : null}
          </div>
          <div className='col-12'>
            <label className='form-label fw-semibold'>Descripción</label>
            <textarea className='form-control' rows='4' {...register('description', { required: 'La descripción es obligatoria' })} />
            {errors.description ? <small className='text-danger'>{errors.description.message}</small> : null}
          </div>
          <div className='col-md-6'>
            <label className='form-label fw-semibold'>URL de imagen</label>
            <input className='form-control' {...register('image_url', { required: 'La imagen es obligatoria' })} />
            {errors.image_url ? <small className='text-danger'>{errors.image_url.message}</small> : null}
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-semibold'>Categoría</label>
            <select className='form-select' {...register('category')}>
              {mockCategories
                .filter((category) => category !== 'todos')
                .map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
            </select>
          </div>
          <div className='col-md-3'>
            <label className='form-label fw-semibold'>Estado</label>
            <select className='form-select' {...register('condition')}>
              <option value='Usado'>Usado</option>
              <option value='Seminuevo'>Seminuevo</option>
            </select>
          </div>
          <div className='col-12'>
            <label className='form-label fw-semibold'>Ubicación</label>
            <input className='form-control' {...register('location', { required: 'La ubicación es obligatoria' })} />
            {errors.location ? <small className='text-danger'>{errors.location.message}</small> : null}
          </div>
        </div>
      </div>
      <div className='card-footer bg-white border-0 p-4 pt-0'>
        <button className='btn btn-primary' type='submit' disabled={submitting}>
          {submitting ? 'Guardando...' : initialData ? 'Guardar cambios' : 'Crear publicación'}
        </button>
      </div>
    </form>
  );
}

export default PublicationForm;
