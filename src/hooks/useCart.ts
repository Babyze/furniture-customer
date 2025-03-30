import { CartContext } from '@src/contexts/CartContext.context';
import { useContext } from 'react';

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }

  return context;
};
