import { useParams } from 'react-router';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="product-detail">
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
      {/* Product details will be added here */}
    </div>
  );
};

export default ProductDetail;
