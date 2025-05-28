import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from "@/store/admin/products-slice";

export default function AdminProductDetails({ productId, onClose }) {
  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  if (!productDetails) return <div>Đang tải chi tiết sản phẩm...</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <img src={productDetails.image} alt={productDetails.title} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold mb-2">{productDetails.title}</h2>
      <p className="mb-2">{productDetails.description}</p>
      <div className="mb-2">Hãng: {productDetails.brand}</div>
      <div className="mb-2">Danh mục: {productDetails.category}</div>
      <div className="mb-2">Giá: {productDetails.price}₫</div>
      {productDetails.salePrice > 0 && <div className="mb-2">Giá khuyến mãi: {productDetails.salePrice}₫</div>}
      <div className="mb-2">Tồn kho: {productDetails.totalStock}</div>
      <div className="mb-2">Đánh giá trung bình: {productDetails.averageReview}</div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onClose}>Đóng</button>
    </div>
  );
}
