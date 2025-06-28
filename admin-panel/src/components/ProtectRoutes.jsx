import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectRoutes = ({ children }) => {
  const { adminToken } = useContext(AuthContext);

  return adminToken ?  <Outlet />  : <Navigate to="/login" />;
};

export default ProtectRoutes;