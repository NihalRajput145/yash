import React, { createContext, useContext, useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return PRODUCTS.filter(product => {
      const haystack = `${product.name} ${product.category} ${product.description} ${product.color} ${product.composition}`.toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [query]);

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        setIsSearchOpen,
        query,
        setQuery,
        searchResults,
        clearSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
