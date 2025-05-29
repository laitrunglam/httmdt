import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Minus, Plus, Truck, Shield, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../../components/ui/use-toast";
import { fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFullImage, setShowFullImage] = useState(false);
  const [fullImageIndex, setFullImageIndex] = useState(0);
  const [thumbStart, setThumbStart] = useState(0); // Thêm state cho vị trí bắt đầu thumbnail

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProduct = async () => {
      try {
        const response = await dispatch(fetchProductDetails(productId)).unwrap();
        const raw = response.data || response;
        // Chuẩn hóa dữ liệu
        const normalized = {
          ...raw,
          images: raw.product.images || (raw.product.image ? [raw.product.image] : []),
          price: raw.product.salePrice ?? raw.product.price,
          originalPrice: raw.product.price,
          inStock: raw.product.totalStock > 0,
          rating: raw.product.averageReview,
          reviewCount: raw.product.reviewCount ?? 0,
          name: raw.product.title,
          reviews: raw.reviews || [],
          colors: raw.colors || [],
          sizes: raw.sizes || [],
          relatedProducts: raw.relatedProducts || [],
          productId: raw.product._id ,
          totalStock: raw.product.totalStock || 0
        };
        console.log('Normalized Product:', normalized);
        setProduct(normalized);
        if (normalized.sizes && normalized.sizes.length > 0) {
          setSelectedSize(normalized.sizes[0]);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) loadProduct();
  }, [productId, dispatch]);

  const renderMarkdown = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mb-4">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold mb-3 mt-6">{line.substring(3)}</h2>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4">{line.substring(2)}</li>;
      }
      if (line.startsWith('![')) {
        const match = line.match(/!\[.*?\]\((.*?)\)/);
        if (match) {
          return <img key={index} src={match[1]} alt="" className="w-full max-w-md mx-auto my-4" />;
        }
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-2">{line}</p>;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-gray-600">Sản phẩm bạn tìm kiếm không tồn tại.</p>
        </div>
      </div>
    );
  }

  function handleAddToCart(productId, totalStock, quantity) {
    console.log('Adding to cart:', { productId, totalStock, quantity });
    if (!user || !user.id) {
      toast({
        title: "Vui lòng đăng nhập để thêm vào giỏ hàng!",
        variant: "destructive",
      });
      return;
    }
    let getCartItems = cartItems?.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + quantity > totalStock) {
          toast({
            title: `Chỉ có thể thêm tối đa ${totalStock} sản phẩm này vào giỏ`,
            variant: "destructive",
          });
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user.id,
        productId,
        quantity,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast({
          title: "Thêm sản phẩm vào giỏ hàng thành công!",
          variant: "success",
        });
      }
    });
  }

  function handleBuyNow(productId, totalStock , quantity ) {
    console.log('Buying now:', { productId, totalStock, quantity });
    if (!user || !user.id) {
      toast({
        title: "Vui lòng đăng nhập để thêm vào giỏ hàng!",
        variant: "destructive",
      });
      return;
    }
    let getCartItems = cartItems?.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + quantity > totalStock) {
          toast({
            title: `Hiện tại chỉ có thể mua tối đa ${totalStock} sản phẩm này`,
            variant: "destructive",
          });
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user.id,
        productId,
        quantity,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id));
        navigate(`/shop/checkout`);
      }
    });
  }

  // Hàm chuyển ảnh
  const handlePrevImage = () => {
    setFullImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  const handleNextImage = () => {
    setFullImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  // Thêm hàm xử lý cuộn thumbnail
  const handleThumbUp = () => {
    setThumbStart((prev) => Math.max(0, prev - 1));
  };
  const handleThumbDown = () => {
    if (!product?.images) return;
    setThumbStart((prev) =>
      prev + 4 < product.images.length ? prev + 1 : prev
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Popup xem ảnh lớn toàn màn hình */}
      {showFullImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
          {/* Số thứ tự ảnh */}
          <div className="absolute top-4 left-6 text-white text-sm select-none">
            {fullImageIndex + 1} / {product.images.length}
          </div>
          {/* Nút đóng */}
          <button
            className="absolute top-4 right-6 text-white bg-black/60 rounded-full p-2 hover:bg-black/80"
            onClick={() => setShowFullImage(false)}
            aria-label="Đóng"
          >
            <X className="w-7 h-7" />
          </button>
          {/* Nút chuyển trái */}
          {product.images.length > 1 && (
            <button
              className="absolute left-4 md:left-10 text-white text-3xl p-2 hover:bg-black/30 rounded-full"
              onClick={handlePrevImage}
              aria-label="Trước"
            >
              &#8592;
            </button>
          )}
          {/* Ảnh lớn */}
          <img
            src={product.images[fullImageIndex]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            style={{ margin: '0 auto' }}
          />
          {/* Tên sản phẩm dưới ảnh */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-white text-base bg-black/40 py-2">
            {product.name}
          </div>
          {/* Nút chuyển phải */}
          {product.images.length > 1 && (
            <button
              className="absolute right-4 md:right-10 text-white text-3xl p-2 hover:bg-black/30 rounded-full"
              onClick={handleNextImage}
              aria-label="Sau"
            >
              &#8594;
            </button>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Phần 1: Thông tin sản phẩm */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bên trái: Hình ảnh sản phẩm */}
            <div className="flex gap-6">
              {/* Danh sách ảnh nhỏ bên trái */}
              <div className="flex flex-col gap-3 relative">
                {/* Nút cuộn lên */}
                {product.images && product.images.length > 4 && thumbStart > 0 && (
                  <button
                    className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 bg-white rounded-full shadow p-1 border hover:bg-gray-100"
                    onClick={handleThumbUp}
                    type="button"
                    tabIndex={-1}
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                )}
                {/* Danh sách ảnh nhỏ, chỉ hiển thị 5 ảnh tại 1 thời điểm */}
                {product.images &&
                  product.images
                    .slice(thumbStart, thumbStart + 5)
                    .map((img, idx) => {
                      const realIdx = thumbStart + idx;
                      return (
                        <button
                          key={realIdx}
                          onClick={() => {
                            setSelectedImage(realIdx);
                            setFullImageIndex(realIdx);
                          }}
                          onDoubleClick={() => {
                            setFullImageIndex(realIdx);
                            setShowFullImage(true);
                          }}
                          className={`overflow-hidden w-20 h-28 mb-1 ${selectedImage === realIdx ? 'ring-2 ring-blue-600' : ''}`}
                          style={{ outline: selectedImage === realIdx ? '2px solid #2563eb' : 'none' }}
                          type="button"
                        >
                          <img
                            src={img}
                            alt={`Ảnh sản phẩm ${realIdx + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </button>
                      );
                    })}
                {/* Nút cuộn xuống */}
                {product.images && product.images.length > 4 && thumbStart + 4 < product.images.length && (
                  <button
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10 bg-white rounded-full shadow p-1 border hover:bg-gray-100"
                    onClick={handleThumbDown}
                    type="button"
                    tabIndex={-1}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                )}
              </div>
              {/* Ảnh lớn bên phải */}
              <div className="relative flex-1 flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="object-cover max-h-[628px] w-auto max-w-full cursor-pointer"
                    style={{ aspectRatio: '5 / 7' }} // Đổi tỷ lệ thành 3:5
                    onClick={() => {
                      setFullImageIndex(selectedImage);
                      setShowFullImage(true);
                    }}
                    onError={e => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-[600px] flex items-center justify-center text-gray-400 bg-gray-100">
                    Không có hình ảnh
                  </div>
                )}
              </div>
            </div>

            {/* Bên phải: Thông tin sản phẩm */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name || 'Tên sản phẩm'}</h1>
                {product.brand && (
                  <p className="text-gray-600">Thương hiệu: <span className="text-blue-600">{product.brand}</span></p>
                )}
                {/* {product.sku && (
                  <p className="text-sm text-gray-500">Mã sản phẩm: {product.sku}</p>
                )} */}
              </div>

              {/* {(product.rating || product.reviewCount) && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating || 0} ({product.reviewCount || 0})
                  </span>
                </div>
              )} */}

              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-red-600">
                    {product.price ? `${product.price.toLocaleString()}đ` : 'Liên hệ'}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice.toLocaleString()}đ
                    </span>
                  )}
                </div>
                {product.discount && (
                  <span className="inline-block bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                    Giảm {product.discount}%
                  </span>
                )}
              </div>

              {/* Chọn màu sắc */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Màu sắc: {product.colors[selectedColor]?.name || ''}
                  </label>
                  <div className="flex space-x-2">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        disabled={!color.available}
                        className={`w-8 h-8 rounded-full border-2 ${selectedColor === index ? 'border-gray-800' : 'border-gray-300'
                          } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Chọn kích thước */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kích thước: {selectedSize}
                  </label>
                  <div className="flex space-x-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-md ${selectedSize === size
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Số lượng */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border border-gray-300 rounded-md min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hiển thị tình trạng kho */}
              <div className="text-sm">
                {product.inStock !== undefined && (
                  <span className={`${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? '✓ Còn hàng' : '✗ Hết hàng'}
                  </span>
                )}
              </div>

              {/* Nút mua hàng */}
              <div className="space-y-3">
                <button
                  className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition duration-200 font-semibold"
                  disabled={product.inStock === false}
                  onClick={() => handleBuyNow(product.productId, product.totalStock, quantity)}
                >
                  MUA NGAY
                </button>
                <button
                  className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition duration-200 flex items-center justify-center space-x-2"
                  disabled={product.inStock === false}
                  onClick={() => handleAddToCart(product.productId, product.totalStock, quantity)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>THÊM VÀO GIỎ</span>
                </button>
              </div>

              {/* Thông tin giao hàng */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5" />
                  <span>Giao hàng toàn quốc</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span>Tích điểm tất cả sản phẩm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phần 2: Mô tả sản phẩm */}
        {product.description && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mô tả sản phẩm</h2>
            <div className="prose max-w-none">
              {renderMarkdown(product.description)}
            </div>
          </div>
        )}

        {/* Phần 3: Đánh giá */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Đánh giá</h2>
            {product.rating && (
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-lg font-semibold">
                  {product.rating} ({product.reviewCount || product.reviews.length})
                </span>
              </div>
            )}
          </div>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-8">
              {product.reviews.map((review, index) => (
                <div
                  key={review._id || index}
                  className="border-b border-gray-200 last:border-b-0 pb-8"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-gray-900">{review.userName || "Ẩn danh"}</div>
                    <div className="text-sm text-gray-500">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString('vi-VN') : ""}
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < (review.reviewValue || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  {review.reviewMessage && (
                    <div className="text-gray-800 mb-2">{review.reviewMessage}</div>
                  )}
                  {/* Bổ sung trường mới tại đây nếu muốn, ví dụ: */}
                  {/* {review.size && (
                    <div className="text-sm text-gray-500">Kích cỡ đã mua: {review.size}</div>
                  )} */}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">Chưa có đánh giá</div>
          )}
        </div>
        {/* Phần 4: Sản phẩm gợi ý */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="bg-white shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm gợi ý</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {product.relatedProducts.map((relatedProduct) => (
                <ShoppingProductTile
                  key={relatedProduct._id || relatedProduct.id}
                  product={relatedProduct}
                  handleGetProductDetails={(id) => {
                    navigate(`/shop/product/${id}`);
                  }}
                  handleAddtoCart={() => {}}
                  isCustomStyling={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;