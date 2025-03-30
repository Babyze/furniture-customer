import { useCart } from '@src/hooks/useCart';
import { Link } from 'react-router';
import './ProductCard.css';
import { Button } from '../ui/Button';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const ProductCard = ({ id, name, price, image }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image,
    });
  };

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img src={image} alt={name} className="product-card__image" />

        <Button variant="primary" className="product-card__add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
      <div className="product-card__content">
        <Link to={`/products/${id}`} className="product-card__name">
          {name}
        </Link>
        <div className="product-card__prices">
          <span className="product-card__price">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
