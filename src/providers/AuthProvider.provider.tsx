import { AuthContext } from '@src/contexts/AuthContext.context';
import { User } from '@src/models/auth.model';
import { authService } from '@src/services/auth.service';
import { ReactNode, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({
        email,
        password,
      });

      setIsAuthenticated(true);
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
