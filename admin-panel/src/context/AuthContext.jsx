import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate()

  const loginAdmin = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:8000/myapp/dhanwis/token/', values);
      console.log(response.data);
      
      const token = response.data.token;
      setAdminToken(token);
      localStorage.setItem('adminToken', token);
      navigate('/')
    } catch (err) {
      setError('Login failed. Check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setAdminToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ adminToken, loginAdmin, logoutAdmin, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
