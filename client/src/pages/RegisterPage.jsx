import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../hooks/useAuth';

function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '', email: '', password: '', confirmPassword: '' } });

  const onSubmit = async ({ confirmPassword, ...values }) => {
    await registerUser(values);
    navigate('/perfil');
  };

  return (
    <AuthLayout
      title="Crea tu cuenta"
      description="Regístrate para publicar artículos y gestionar favoritos."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="d-grid gap-3">
        <div>
          <label className="form-label fw-semibold">Nombre</label>
          <input
            className="form-control"
            {...register('name', { required: 'El nombre es obligatorio' })}
          />
          {errors.name ? <small className="text-danger">{errors.name.message}</small> : null}
        </div>

        <div>
          <label className="form-label fw-semibold">Correo electrónico</label>
          <input
            className="form-control"
            type="email"
            {...register('email', { required: 'El correo es obligatorio' })}
          />
          {errors.email ? <small className="text-danger">{errors.email.message}</small> : null}
        </div>

        <div>
          <label className="form-label fw-semibold">Contraseña</label>
          <input
            className="form-control"
            type="password"
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' },
            })}
          />
          {errors.password ? <small className="text-danger">{errors.password.message}</small> : null}
        </div>

        <div>
          <label className="form-label fw-semibold">Confirmar contraseña</label>
          <input
            className="form-control"
            type="password"
            {...register('confirmPassword', {
              required: 'Confirma tu contraseña',
              validate: (value) => value === watch('password') || 'Las contraseñas no coinciden',
            })}
          />
          {errors.confirmPassword ? (
            <small className="text-danger">{errors.confirmPassword.message}</small>
          ) : null}
        </div>

        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creando cuenta...' : 'Registrarme'}
        </button>

        <p className="text-body-secondary small mb-0">
          ¿Ya tienes cuenta? <Link to="/login">Ingresa aquí</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
