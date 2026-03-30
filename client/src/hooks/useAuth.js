import { useAppContext } from '../context/AppContext';

export const useAuth = () => {
  const { user, token, login, register, logout } = useAppContext();

  return {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout,
  };
};
