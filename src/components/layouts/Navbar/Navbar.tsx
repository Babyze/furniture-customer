import { ROUTES } from '@src/constants/routes';
import { useAuth } from '@src/hooks/useAuth';
import { useCart } from '@src/hooks/useCart';
import { useState } from 'react';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link } from 'react-router';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  console.log(cartItemCount);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          3legant.
        </Link>

        <div className="navbar__actions">
          <div className="navbar__user">
            <button className="navbar__action-btn" onClick={toggleMenu}>
              <FiUser />
            </button>
            {isMenuOpen && (
              <div className="navbar__dropdown">
                {!isAuthenticated ? (
                  <>
                    <Link to={ROUTES.AUTH.SIGN_IN} className="navbar__dropdown-item">
                      Sign In
                    </Link>
                    <Link to={ROUTES.AUTH.SIGN_UP} className="navbar__dropdown-item">
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={ROUTES.ORDERS} className="navbar__dropdown-item">
                      Orders
                    </Link>
                    <Link to={ROUTES.SETTINGS} className="navbar__dropdown-item">
                      Settings
                    </Link>
                    <button onClick={logout} className="navbar__dropdown-item">
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <Link to={ROUTES.CART} className="navbar__action-btn navbar__cart">
            <FiShoppingCart />
            {cartItemCount > 0 && <span className="navbar__cart-badge">{cartItemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
