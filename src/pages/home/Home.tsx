import { ProductCard } from '@src/components/ProductCard/ProductCard';
import { Loading } from '@src/components/ui/Loading';
import { productService } from '@src/services/product.service';
import { useEffect, useState } from 'react';
import './Home.css';
import { Product } from '@src/models/product.model';
import { Category } from '@src/models/category.model';
import { categoryService } from '@src/services/category.service';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 0,
      name: 'All Rooms',
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productResponse, categoryResponse] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories(),
        ]);
        setProducts(productResponse.items);
        setCategories(categoryResponse);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="product-list">
      <div className="product-list__content">
        <aside className="product-list__sidebar">
          <div className="product-list__filter">
            <h3>CATEGORIES</h3>
            <div className="product-list__categories-wrapper">
              <ul className="product-list__categories">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={`product-list__category ${
                      selectedCategory === category.id ? 'active' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <main className="product-list__main">
          {isLoading ? (
            <Loading />
          ) : (
            <div className={`product-list__grid product-list__grid--grid-3`}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id.toString()}
                  name={product.name}
                  minPrice={product.minPrice}
                  maxPrice={product.maxPrice}
                  image={product.imageUrl}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
