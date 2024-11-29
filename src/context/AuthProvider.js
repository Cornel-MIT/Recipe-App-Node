import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', { 
        username,
        password,
      });

      if (response.data.token) {
        // Save JWT token to localStorage
        localStorage.setItem('token', response.data.token);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        password,
      });
  
      if (response.data.message === 'User created successfully') {
        const userData = { username }; 
        setUser(userData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };
  

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
