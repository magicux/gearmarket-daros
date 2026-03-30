import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (values) => {
    await login(values);
    navigate('/perfil');
  };

  return (
    <AuthLayout
      title="Inicia sesión"
      description="Accede a tus favoritos, perfil y publicaciones privadas."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="d-grid gap-3">
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
            {...register('password', { required: 'La contraseña es obligatoria' })}
          />
          {errors.password ? <small className="text-danger">{errors.password.message}</small> : null}
        </div>

        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </button>

        <p className="text-body-secondary small mb-0">
          ¿Aún no tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
