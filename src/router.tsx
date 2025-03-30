import { createBrowserRouter } from 'react-router';
import App from './App';
import ProductList from '@src/components/ProductList/ProductList';
import { ROUTES } from '@src/constants/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: ROUTES.AUTH.SIGN_IN,
        element: <div>Sign In</div>,
      },
      {
        path: ROUTES.AUTH.SIGN_UP,
        element: <div>Sign Up</div>,
      },
      {
        path: ROUTES.ORDERS,
        element: <div>Orders</div>,
      },
      {
        path: ROUTES.SETTINGS,
        element: <div>Settings</div>,
      },
      {
        path: ROUTES.CART,
        element: <div>Cart</div>,
      },
    ],
  },
]);

export default router;
