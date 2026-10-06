import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('shopora_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('shopora_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.get('/auth/me')
        .then((res) => {
          if (res.data && res.data.data) {
            setUser(res.data.data);
            localStorage.setItem('shopora_user', JSON.stringify(res.data.data));
          }
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data && res.data.data) {
      const authData = res.data.data;
      setToken(authData.token);
      setUser(authData);
      localStorage.setItem('shopora_token', authData.token);
      localStorage.setItem('shopora_user', JSON.stringify(authData));
      return authData;
    }
    throw new Error('Authentication failed');
  };

  const register = async (fullName, email, password, phone) => {
    const res = await api.post('/auth/register', { fullName, email, password, phone });
    if (res.data && res.data.data) {
      const authData = res.data.data;
      setToken(authData.token);
      setUser(authData);
      localStorage.setItem('shopora_token', authData.token);
      localStorage.setItem('shopora_user', JSON.stringify(authData));
      return authData;
    }
    throw new Error('Registration failed');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('shopora_token');
    localStorage.removeItem('shopora_user');
  };

  const isAdmin = user && (user.role === 'ROLE_ADMIN' || user.role === 'ADMIN');

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, isAdmin, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
