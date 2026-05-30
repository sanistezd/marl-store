'use client';
import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(localStorage.getItem('isAuth') === 'true');
    };
    
    checkAuth();
    
    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-change', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const login = () => {
    localStorage.setItem('isAuth', 'true');
    window.dispatchEvent(new Event('auth-change'));
  };

  const logout = () => {
    localStorage.setItem('isAuth', 'false');
    window.dispatchEvent(new Event('auth-change'));
  };

  return { isAuth, login, logout };
}
