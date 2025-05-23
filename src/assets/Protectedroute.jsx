import { Navigate } from 'react-router-dom';
import { useAuth } from '../assets/Authprovider';

const ProtectedRoute =  ({ children }) => {
  
  const {user} = useAuth()
  return user ? children : <Navigate to="/admin/dashboard/login" />;
};

export default ProtectedRoute;

 
