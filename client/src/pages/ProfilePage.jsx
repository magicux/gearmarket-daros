import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { useAuth } from '../hooks/useAuth';
import { usePublications } from '../hooks/usePublications';
import { useAppContext } from '../context/AppContext';

function ProfilePage() {
  const { user } = useAuth();
  const { stats } = usePublications();
  const { refreshProfile } = useAppContext();

  useEffect(() => {
    refreshProfile().catch(() => undefined);
  }, [refreshProfile]);

  return (
    <section>
      <SectionTitle
        eyebrow="Perfil"
        title={`Bienvenido, ${user?.name}`}
        description="Vista privada protegida por React Router y conectada al endpoint /profile del backend."
      />

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="avatar-circle mb-3">{user?.name?.charAt(0) || 'G'}</div>
              <h2 className="h4 fw-bold mb-1">{user?.name}</h2>
              <p className="text-body-secondary mb-3">{user?.email}</p>
              <p className="mb-0">
                Desde aquí podrás administrar publicaciones, revisar favoritos y probar los endpoints privados del Hito 3.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="row g-3">
            <div className="col-sm-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <div className="text-body-secondary small">Publicaciones</div>
                  <div className="display-6 fw-bold">{stats.total}</div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <div className="text-body-secondary small">Favoritos</div>
                  <div className="display-6 fw-bold">{stats.favorites}</div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <div className="text-body-secondary small">Mis publicaciones</div>
                  <div className="display-6 fw-bold">{stats.mine}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 mt-4">
            <div className="card-body p-4 d-flex flex-wrap gap-3">
              <Link className="btn btn-primary" to="/mis-publicaciones">
                Ver mis publicaciones
              </Link>
              <Link className="btn btn-outline-primary" to="/crear-publicacion">
                Crear nueva publicación
              </Link>
              <Link className="btn btn-outline-secondary" to="/favoritos">
                Revisar favoritos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
