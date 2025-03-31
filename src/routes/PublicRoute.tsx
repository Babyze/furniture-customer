import { Loading } from '@src/components/ui/Loading';
import { ROUTES } from '@src/constants/routes';
import { useAuth } from '@src/hooks/useAuth';
import { Navigate } from 'react-router';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.ROOT} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
