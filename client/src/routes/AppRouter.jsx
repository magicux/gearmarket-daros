import { Route, Routes } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PrivateRoute from '../components/PrivateRoute';
import CreatePublicationPage from '../pages/CreatePublicationPage';
import EditPublicationPage from '../pages/EditPublicationPage';
import FavoritesPage from '../pages/FavoritesPage';
import GalleryPage from '../pages/GalleryPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MessagesPage from '../pages/MessagesPage';
import MyPublicationsPage from '../pages/MyPublicationsPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';

function Layout({ children }) {
  return (
    <div className='app-shell min-vh-100 d-flex flex-column bg-body-tertiary'>
      <Navbar />
      <main className='container py-4 py-lg-5 flex-grow-1'>{children}</main>
      <Footer />
    </div>
  );
}

function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/galeria' element={<GalleryPage />} />
        <Route path='/publicaciones/:id' element={<ProductDetailPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registro' element={<RegisterPage />} />

        <Route element={<PrivateRoute />}>
          <Route path='/perfil' element={<ProfilePage />} />
          <Route path='/mis-publicaciones' element={<MyPublicationsPage />} />
          <Route path='/crear-publicacion' element={<CreatePublicationPage />} />
          <Route path='/editar/:id' element={<EditPublicationPage />} />
          <Route path='/favoritos' element={<FavoritesPage />} />
          <Route path='/mensajes' element={<MessagesPage />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default AppRouter;
