import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authService, favoritesService, profileService, publicationsService } from '../services/api';

const AppContext = createContext();

const normalizePublication = (publication) => ({
  ...publication,
  id: Number(publication.id),
  price: Number(publication.price),
  seller: publication.seller || publication.user || null,
  isFavorite: Boolean(publication.isFavorite),
  condition: publication.condition || 'Usado',
});

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('gearmarket_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('gearmarket_token') || '');
  const [publications, setPublications] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ search: '', category: 'todos' });

  useEffect(() => {
    if (token) {
      localStorage.setItem('gearmarket_token', token);
    } else {
      localStorage.removeItem('gearmarket_token');
    }

    if (user) {
      localStorage.setItem('gearmarket_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gearmarket_user');
    }
  }, [token, user]);

  const applyFavoriteFlags = useCallback((items, ids) => {
    return items.map((publication) => normalizePublication({
      ...publication,
      isFavorite: ids.includes(Number(publication.id)),
    }));
  }, []);

  const fetchFavorites = useCallback(async () => {
    if (!token) {
      setFavoriteIds([]);
      return [];
    }

    const response = await favoritesService.getAll();
    const ids = response.data.map((favorite) => Number(favorite.publication_id));
    setFavoriteIds(ids);
    return ids;
  }, [token]);

  const fetchPublications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await publicationsService.getAll();
      const ids = token ? await fetchFavorites() : [];
      setPublications(applyFavoriteFlags(response.data, ids));
    } finally {
      setLoading(false);
    }
  }, [applyFavoriteFlags, fetchFavorites, token]);

  useEffect(() => {
    fetchPublications().catch(() => {
      setPublications([]);
    });
  }, [fetchPublications]);

  useEffect(() => {
    if (!token) {
      setFavoriteIds([]);
      setPublications((current) => current.map((item) => ({ ...item, isFavorite: false })));
      return;
    }

    fetchFavorites()
      .then((ids) => {
        setPublications((current) => applyFavoriteFlags(current, ids));
      })
      .catch(() => {
        setFavoriteIds([]);
      });
  }, [applyFavoriteFlags, fetchFavorites, token]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const register = async (payload) => {
    const response = await authService.register(payload);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const logout = () => {
    setUser(null);
    setToken('');
    setFavoriteIds([]);
  };

  const refreshProfile = async () => {
    if (!token) return null;
    const response = await profileService.get();
    setUser(response.data);
    return response.data;
  };

  const getPublicationById = useCallback(
    (publicationId) =>
      publications.find((publication) => Number(publication.id) === Number(publicationId)) || null,
    [publications],
  );

  const toggleFavorite = async (publicationId) => {
    const numericId = Number(publicationId);

    if (!token) {
      setPublications((current) =>
        current.map((publication) =>
          publication.id === numericId
            ? { ...publication, isFavorite: !publication.isFavorite }
            : publication,
        ),
      );
      return;
    }

    if (favoriteIds.includes(numericId)) {
      await favoritesService.remove(numericId);
      const ids = favoriteIds.filter((id) => id !== numericId);
      setFavoriteIds(ids);
      setPublications((current) => applyFavoriteFlags(current, ids));
      return;
    }

    await favoritesService.add(numericId);
    const ids = [...favoriteIds, numericId];
    setFavoriteIds(ids);
    setPublications((current) => applyFavoriteFlags(current, ids));
  };

  const createPublication = async (payload) => {
    const response = await publicationsService.create(payload);
    await fetchPublications();
    return response.data;
  };

  const updatePublication = async (publicationId, payload) => {
    await publicationsService.update(publicationId, payload);
    await fetchPublications();
    return getPublicationById(publicationId);
  };

  const deletePublication = async (publicationId) => {
    await publicationsService.remove(publicationId);
    await fetchPublications();
  };

  const filteredPublications = useMemo(() => {
    return publications.filter((publication) => {
      const search = filters.search.toLowerCase();
      const matchSearch =
        publication.title.toLowerCase().includes(search) ||
        publication.location.toLowerCase().includes(search) ||
        publication.category.toLowerCase().includes(search);

      const matchCategory = filters.category === 'todos' || publication.category === filters.category;

      return matchSearch && matchCategory;
    });
  }, [filters, publications]);

  const favorites = publications.filter((publication) => publication.isFavorite);
  const myPublications = publications.filter(
    (publication) => Number(publication.seller?.id) === Number(user?.id),
  );

  const value = {
    user,
    token,
    loading,
    publications,
    filteredPublications,
    favorites,
    myPublications,
    favoriteIds,
    filters,
    setFilters,
    login,
    register,
    logout,
    refreshProfile,
    toggleFavorite,
    createPublication,
    updatePublication,
    deletePublication,
    getPublicationById,
    fetchPublications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);
