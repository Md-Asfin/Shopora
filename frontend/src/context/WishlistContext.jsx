import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }
    try {
      setLoading(true);
      const res = await api.get('/wishlist');
      if (res.data && res.data.data) {
        setWishlist(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  const addToWishlist = async (productId) => {
    if (!isAuthenticated) return;
    try {
      await api.post(`/wishlist/${productId}`);
      fetchWishlist();
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated) return;
    try {
      await api.delete(`/wishlist/${productId}`);
      setWishlist((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((p) => p.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
