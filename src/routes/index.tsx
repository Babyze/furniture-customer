import { ROUTES } from '@src/constants/routes';
import { createBrowserRouter } from 'react-router';

// Layouts
import AuthLayout from '@src/components/layouts/AuthLayout';
import MainLayout from '@src/components/layouts/MainLayout';

// Route protection
import PublicRoute from '@src/routes/PublicRoute';

// Auth pages
import SignIn from '@src/pages/auth/SignIn';

// Main pages
import Home from '@src/pages/home/Home';

// Error pages
import NotFound from '@src/pages/error/NotFound';
import SignUp from '@src/pages/auth/SignUp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.AUTH.SIGN_IN,
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
      {
        path: ROUTES.AUTH.SIGN_UP,
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
]);
