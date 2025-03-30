import { ProductCard } from '@src/components/ProductCard/ProductCard';
import { Loading } from '@src/components/ui/Loading';
import { LoadMoreButton } from '@src/components/ui/LoadMoreButton';
import { Button } from '@src/components/ui/Button';
import { ALL_CATEGORY_DEFAULT } from '@src/constants/category.constant';
import { PAGINATION_CONSTANT } from '@src/constants/pagination.constant';
import { Category } from '@src/models/category.model';
import { Product } from '@src/models/product.model';
import { categoryService } from '@src/services/category.service';
import { productService } from '@src/services/product.service';
import { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await categoryService.getCategories();
        setCategories(categories);
      } catch (_error) {
        console.log(_error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productResponse = await productService.getProducts({
          categoryId: selectedCategory,
          page: 1,
          limit: PAGINATION_CONSTANT.ITEMS_PER_PAGE,
        });
        setProducts(productResponse.items);
        setHasMore(productResponse.meta.currentPage < productResponse.meta.totalPages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      const productResponse = await productService.getProducts({
        categoryId: selectedCategory,
        page: nextPage,
        limit: PAGINATION_CONSTANT.ITEMS_PER_PAGE,
      });

      setProducts((prev) => [...prev, ...productResponse.items]);
      setCurrentPage(nextPage);
      setHasMore(productResponse.meta.currentPage < productResponse.meta.totalPages);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="product-list">
      <div className="product-list__content">
        <aside
          className={`product-list__sidebar ${isSidebarOpen ? 'product-list__sidebar--open' : ''}`}
        >
          <div className="product-list__filter">
            <h3>CATEGORIES</h3>
            <div className="product-list__categories-wrapper">
              <ul className="product-list__categories">
                <li
                  key={ALL_CATEGORY_DEFAULT.id}
                  className={`product-list__category ${
                    selectedCategory === ALL_CATEGORY_DEFAULT.id ? 'active' : ''
                  }`}
                  onClick={() => {
                    setSelectedCategory(ALL_CATEGORY_DEFAULT.id);
                    setIsSidebarOpen(false);
                  }}
                >
                  {ALL_CATEGORY_DEFAULT.name}
                </li>
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={`product-list__category ${
                      selectedCategory === category.id ? 'active' : ''
                    }`}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setIsSidebarOpen(false);
                    }}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        <main className="product-list__main">
          <Button
            variant="secondary"
            className="product-list__toggle-sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? 'Close Filters' : 'Open Filters'}
          </Button>
          <ProductList isLoading={isLoading} products={products} />
          <LoadMoreButton isLoading={isLoadingMore} hasMore={hasMore} onClick={handleLoadMore} />
        </main>
      </div>
    </div>
  );
};

interface ProductListProps {
  isLoading: boolean;
  products: Product[];
}

const ProductList = ({ isLoading, products }: ProductListProps) => {
  if (isLoading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
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
  );
};

export default Home;
