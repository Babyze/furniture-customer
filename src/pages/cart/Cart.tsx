import { Button } from '@src/components/ui/Button';
import { Input } from '@src/components/ui/Input';
import { ROUTES } from '@src/constants/routes';
import { CartItem } from '@src/contexts/CartContext.context';
import { useAuth } from '@src/hooks/useAuth';
import { useCart } from '@src/hooks/useCart';
import { OrderForm } from '@src/models/order.model';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './Cart.css';
import { orderService } from '@src/services/order.service';

const Cart = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [formData, setFormData] = useState<OrderForm>({
    fullName: '',
    phoneNumber: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      fullName: user?.fullName ?? '',
      phoneNumber: '',
      address: '',
    });
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity);
  };

  const handleRemoveItem = (itemId: number) => {
    removeItem(itemId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    try {
      setIsSubmitting(true);

      const orderItems = items.map((item: CartItem) => ({
        productId: item.id,
        spuId: item.spuId,
        skuId: item.skuId,
        quantity: item.quantity,
      }));

      await orderService.placeOrder({
        information: formData,
        items: orderItems,
      });

      alert('Order placed successfully!');
      clearCart();
      navigate(ROUTES.ROOT);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <Button variant="primary" onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__items">
          <h2>Your Cart</h2>
          {items.map((item) => (
            <div key={item.id} className="cart__item">
              <img src={item.image} alt={item.name} className="cart__item-image" />
              <div className="cart__item-info">
                <h3>{item.name}</h3>
                <p className="cart__item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="cart__item-quantity">
                <Button
                  variant="ghost"
                  onClick={() => handleQuantityChange(item, item.quantity - 1)}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="ghost"
                  onClick={() => handleQuantityChange(item, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                className="cart__item-remove"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        <div className="cart__summary">
          <h2>Order Summary</h2>
          <div className="cart__total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <form onSubmit={handleSubmit} className="cart__form">
            <div className="cart__form-group">
              <label htmlFor="fullName">Full Name</label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="cart__form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="cart__form-group">
              <label htmlFor="address">Address</label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            {isAuthenticated ? (
              <Button
                type="submit"
                variant="primary"
                className="cart__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </Button>
            ) : (
              <Link to={ROUTES.AUTH.SIGN_IN}>
                <Button variant="primary" className="cart__submit" style={{ width: '100%' }}>
                  Sign in to place order
                </Button>
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
