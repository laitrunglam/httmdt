import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { productId } = useParams();
  console.log('Navigated to Product ID:', productId);

  return (
    <div className="p-4 text-center text-green-600">
      Đã vào được sản phẩm
    </div>
  );
};

export default ProductDetailPage;