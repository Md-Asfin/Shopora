import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    subtotal: 0,
    discount: 0,
    deliveryFee: 0,
    totalAmount: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated) {
      // Local storage cart for guest browsing
      const localCart = localStorage.getItem('shopora_guest_cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      } else {
        setCart({ items: [], totalItems: 0, subtotal: 0, discount: 0, deliveryFee: 0, totalAmount: 0 });
      }
      return;
    }

    try {
      setLoading(true);
      const res = await api.get('/cart');
      if (res.data && res.data.data) {
        setCart(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (productId, quantity = 1, selectedColor = null, selectedStorage = null) => {
    if (!isAuthenticated) {
      // Allow guest add to cart simulation
      setCart((prev) => {
        const existingIdx = prev.items.findIndex((item) => item.productId === productId);
        let newItems = [...prev.items];
        if (existingIdx > -1) {
          newItems[existingIdx].quantity += quantity;
        } else {
          newItems.push({
            id: Date.now(),
            productId,
            quantity,
            selectedColor,
            selectedStorage,
          });
        }
        const updated = { ...prev, items: newItems, totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0) };
        localStorage.setItem('shopora_guest_cart', JSON.stringify(updated));
        return updated;
      });
      return;
    }

    try {
      const res = await api.post('/cart/items', {
        productId,
        quantity,
        selectedColor,
        selectedStorage,
      });
      if (res.data && res.data.data) {
        setCart(res.data.data);
      }
    } catch (err) {
      console.error('Add to cart failed:', err);
      throw err;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!isAuthenticated) return;
    try {
      const res = await api.put(`/cart/items/${itemId}?quantity=${quantity}`);
      if (res.data && res.data.data) {
        setCart(res.data.data);
      }
    } catch (err) {
      console.error('Update quantity failed:', err);
      throw err;
    }
  };

  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) return;
    try {
      const res = await api.delete(`/cart/items/${itemId}`);
      if (res.data && res.data.data) {
        setCart(res.data.data);
      }
    } catch (err) {
      console.error('Remove item failed:', err);
      throw err;
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      localStorage.removeItem('shopora_guest_cart');
      setCart({ items: [], totalItems: 0, subtotal: 0, discount: 0, deliveryFee: 0, totalAmount: 0 });
      return;
    }
    try {
      await api.delete('/cart');
      setCart({ items: [], totalItems: 0, subtotal: 0, discount: 0, deliveryFee: 0, totalAmount: 0 });
    } catch (err) {
      console.error('Clear cart failed:', err);
    }
  };

  const getCartSubtotal = () => {
    return cart?.subtotal || cart?.items?.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0) || 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
        getCartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
