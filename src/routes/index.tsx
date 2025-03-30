import { createBrowserRouter } from 'react-router';
import { ROUTES } from '@src/constants/routes';

// Layouts
import AuthLayout from '@src/components/layouts/AuthLayout';
import MainLayout from '@src/components/layouts/MainLayout';

// Route protection
import PublicRoute from '@src/routes/PublicRoute';

// Auth pages
import SignIn from '@src/pages/auth/SignIn';

// Main pages
import Home from '@src/pages/home/Home';
import Products from '@src/pages/products/Products';
import ProductDetail from '@src/pages/products/ProductDetail';

// Error pages
import NotFound from '@src/pages/error/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.PRODUCTS,
        element: <Products />,
      },
      {
        path: ROUTES.PRODUCT_DETAIL,
        element: <ProductDetail />,
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
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
]);
