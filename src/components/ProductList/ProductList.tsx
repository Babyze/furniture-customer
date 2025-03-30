import { useState } from 'react';
import './ProductList.css';
import { ProductCard } from '../ProductCard/ProductCard';

const CATEGORIES = [
  'All Rooms',
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Bathroom',
  'Dinning',
  'Outdoor',
  'Office',
  'Kids Room',
  'Storage',
  'Hallway',
  'Balcony',
  'Garden',
];

const PRICE_RANGES = [
  { label: 'All', value: 'all' },
  { label: '$0.00 - 99.99', value: '0-99.99' },
  { label: '$100.00 - 199.99', value: '100-199.99' },
  { label: '$200.00 - 299.99', value: '200-299.99' },
  { label: '$300.00 - 399.99', value: '300-399.99' },
  { label: '$400.00+', value: '400-up' },
];

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Loveseat Sofa',
    price: 199.99,
    originalPrice: 400,
    image: '/images/sofa-1.jpg',
    isNew: true,
    discount: 50,
    rating: 5,
  },
  {
    id: '2',
    name: 'Luxury Sofa',
    price: 299,
    originalPrice: 600,
    image: '/images/sofa-2.jpg',
    isNew: true,
    discount: 50,
    rating: 5,
  },
  {
    id: '3',
    name: 'Table Lamp',
    price: 19,
    originalPrice: 38,
    image: '/images/lamp-1.jpg',
    isNew: true,
    discount: 50,
    rating: 5,
  },
];

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Rooms');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const handlePriceRangeChange = (value: string) => {
    setSelectedPriceRanges((prev) => {
      if (prev.includes(value)) {
        return prev.filter((range) => range !== value);
      }
      return [...prev, value];
    });
  };

  return (
    <div className="product-list">
      <div className="product-list__content">
        <aside className="product-list__sidebar">
          <div className="product-list__filter">
            <h3>CATEGORIES</h3>
            <div className="product-list__categories-wrapper">
              <ul className="product-list__categories">
                {CATEGORIES.map((category) => (
                  <li
                    key={category}
                    className={`product-list__category ${
                      selectedCategory === category ? 'active' : ''
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="product-list__filter">
            <h3>PRICE</h3>
            <ul className="product-list__price-ranges">
              {PRICE_RANGES.map((range) => (
                <li key={range.value} className="product-list__price-range">
                  <label className="product-list__checkbox-label">
                    <span className="product-list__checkbox-text">{range.label}</span>

                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes(range.value)}
                      onChange={() => handlePriceRangeChange(range.value)}
                      className="product-list__checkbox"
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="product-list__main">
          <div className={`product-list__grid product-list__grid--grid-3`}>
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductList;
