import { Link } from 'react-router';
import './ProductCard.css';

interface ProductCardProps {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  image: string;
}

export const ProductCard = ({ id, name, minPrice, maxPrice, image }: ProductCardProps) => {
  return (
    <Link to={`/products/${id}`} className="product-card">
      <div className="product-card__image-container">
        <img
          src={image ? image : '/public/unknown-image-product.png'}
          alt={name}
          className="product-card__image"
        />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__name">{name}</h3>
        <div className="product-card__prices">
          <span className="product-card__price">${minPrice.toFixed(2)}</span>
          <span className="product-card__price">${maxPrice.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
};
