import { Button } from '@src/components/ui/Button';
import { Loading } from '@src/components/ui/Loading';
import { useCart } from '@src/hooks/useCart';
import { Product, ProductSpu } from '@src/models/product.model';
import { productService } from '@src/services/product.service';
import { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link, useParams } from 'react-router';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [spus, setSpus] = useState<ProductSpu[]>([]);
  const [selectedSpu, setSelectedSpu] = useState<ProductSpu | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productData, spusData] = await Promise.all([
          productService.getProductById(Number(id)),
          productService.getProductSpus(Number(id)),
        ]);
        setProduct(productData);
        setSpus(spusData);
        if (spusData.length > 0) {
          setSelectedSpu(spusData[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedSpu) return;

    addItem({
      id: Number(product.id),
      name: selectedSpu.name,
      price: Number(selectedSpu.price),
      spuId: selectedSpu.id,
      skuId: selectedSpu.skuId,
      image: product.imageUrl,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <Link to="/" className="auth-back-to-home">
        <IoMdArrowRoundBack /> <p>Back to home</p>
      </Link>
      <div className="product-detail__container">
        <div className="product-detail__image">
          <img
            src={product.imageUrl ? product.imageUrl : '/unknown-image-product.png'}
            alt={product.name}
          />
        </div>
        <div className="product-detail__content">
          <h1 className="product-detail__name">{product.name}</h1>
          {selectedSpu && (
            <div className="product-detail__prices">
              <span className="product-detail__price">${Number(selectedSpu.price).toFixed(2)}</span>
            </div>
          )}
          <div className="product-detail__categories">
            <h2 className="product-detail__section-title">Category:</h2>
            <span className="product-detail__category">{product.categoryName}</span>
            <span className="product-detail__category">{product.categoryAreaName}</span>
          </div>
          <div className="product-detail__description">
            <h2 className="product-detail__section-title">Description</h2>
            <p>{product.description}</p>
          </div>
          <div className="product-detail__measurements">
            <h2 className="product-detail__section-title">Measurements</h2>
            <p>{product.measurements}</p>
          </div>
          {spus.length > 0 && (
            <div className="product-detail__variants">
              <h2 className="product-detail__section-title">Available Variants</h2>
              <div className="product-detail__variant-list">
                {spus.map((spu, index) => (
                  <button
                    key={index}
                    className={`product-detail__variant-item ${
                      selectedSpu?.name === spu.name ? 'product-detail__variant-item--active' : ''
                    }`}
                    onClick={() => setSelectedSpu(spu)}
                  >
                    <span className="product-detail__variant-name">{spu.name}</span>
                    <span className="product-detail__variant-price">
                      ${Number(spu.price).toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {selectedSpu && (
            <div className="product-detail__stock-info">
              <span className="product-detail__stock-label">Stock:</span>
              <span className="product-detail__stock-value">{selectedSpu.quantity}</span>
            </div>
          )}
          {selectedSpu && selectedSpu.quantity > 0 && (
            <Button
              variant="primary"
              className="product-detail__add-to-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
