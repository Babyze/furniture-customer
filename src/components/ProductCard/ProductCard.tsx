import { useCart } from '@src/hooks/useCart';
import { Link } from 'react-router';
import './ProductCard.css';
import { Button } from '../ui/Button';

interface ProductCardProps {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  image: string;
}

export const ProductCard = ({ id, name, minPrice, maxPrice, image }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      minPrice,
      maxPrice,
      image,
    });
  };

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img
          src={image ? `http://${image}` : '/public/unknown-image-product.png'}
          alt={name}
          className="product-card__image"
        />

        <Button variant="primary" className="product-card__add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
      <div className="product-card__content">
        <Link to={`/products/${id}`} className="product-card__name">
          {name}
        </Link>
        <div className="product-card__prices">
          <span className="product-card__price">${minPrice.toFixed(2)}</span>
          <span className="product-card__price">${maxPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
