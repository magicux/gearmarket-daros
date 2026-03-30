import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';

export const usePublications = () => {
  const {
    publications,
    filteredPublications,
    favorites,
    myPublications,
    loading,
    filters,
    setFilters,
    toggleFavorite,
    createPublication,
    updatePublication,
    deletePublication,
    getPublicationById,
  } = useAppContext();

  const stats = useMemo(
    () => ({
      total: publications.length,
      favorites: favorites.length,
      mine: myPublications.length,
    }),
    [favorites.length, myPublications.length, publications.length],
  );

  return {
    publications,
    filteredPublications,
    favorites,
    myPublications,
    loading,
    filters,
    setFilters,
    toggleFavorite,
    createPublication,
    updatePublication,
    deletePublication,
    getPublicationById,
    stats,
  };
};
