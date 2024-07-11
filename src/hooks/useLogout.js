import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const useLogout = () => {
  const [error, setError] = useState(null);
  const { logout: authLogout } = useAuth();

  const logout = async () => {
    try {
      await authLogout();
      setError(null);
    } catch (err) {
      console.error('Failed to log out', err);
      setError('Failed to log out');
    }
  };

  return { logout, error };
};

export default useLogout;
