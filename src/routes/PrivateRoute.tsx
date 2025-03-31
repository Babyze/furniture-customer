import { Navigate, useLocation } from 'react-router';
import { ROUTES } from '@src/constants/routes';
import { useAuth } from '@src/hooks/useAuth';
import { useEffect } from 'react';
import { Loading } from '@src/components/ui/Loading';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      <Navigate to={ROUTES.AUTH.SIGN_IN} state={{ from: location }} replace />;
    }
  }, [isAuthenticated, location]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.SIGN_IN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
