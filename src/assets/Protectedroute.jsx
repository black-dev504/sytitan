import { Navigate } from 'react-router-dom';
import { useAuth } from '../assets/Authprovider';

const ProtectedRoute = async ({ children }) => {
  const {user} = useAuth()
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

 
