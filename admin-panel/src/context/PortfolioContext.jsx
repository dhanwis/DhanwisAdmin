// src/context/PortfolioContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
 import { ToastContainer, toast } from 'react-toastify';

export const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('adminToken');

  const API_URL = 'http://127.0.0.1:8000/myapp/dhanwis/portfolio/';

  // Get all portfolios
  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}list/`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setPortfolios(response.data);
      console.log(response.data);
      
    } catch (err) {
      setError(err.message || 'Failed to fetch portfolios');
    } finally {
      setLoading(false);
    }
  };

  // Delete portfolio
  const deletePortfolios = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}${id}/`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      toast.success('Portfolio Successfully Deleted')
      fetchPortfolios();
    } catch (err) {
        toast.error('Failed to delete portfolio')
      setError(err.message || 'Failed to delete portfolio');
    } finally {
      setLoading(false);
    }
  };

  // Add new portfolio
  const addPortfolio = async (data) => {
    try {
      const headers = token ? { Authorization: `token ${token}` } : {};
      const response = await axios.post(API_URL, data, { headers });
      setPortfolios((prev) => [...prev, response.data]);
      message.success('Portfolio added!');
            toast.success('Portfolio added!')

      return response.data;
    } catch (err) {
        toast.error('An error occurred during submission.');
      setError(err.message || 'Failed to add portfolio');
      throw err;
    }
  };

  // Edit portfolio
  const editPortfolio = async (id, updatedData) => {
  console.log('Updated data:', updatedData, 'ID:', id);
  setLoading(true);

  try {
    const headers = token ? { Authorization: `token ${token}` } : {};
    const response = await axios.put(`${API_URL}${id}/`, updatedData, { headers });
  console.log(response);
   toast.success('Portfolio Updated!');
  
    // Optionally refresh the data
    fetchPortfolios();

         


    return response.data;
  } catch (err) {
    console.log(err);

          toast.error('Failed to edit portfolio');

    
    setError(err.message || 'Failed to edit portfolio');
    throw err;
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        portfolios,
        loading,
        error,
        fetchPortfolios,
        addPortfolio,
        deletePortfolios,
        editPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
