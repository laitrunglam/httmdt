import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const [hovered, setHovered] = useState(false);

  // Lấy ảnh đầu tiên và ảnh thứ hai (nếu có)
  const hasSecondImage =
    Array.isArray(product?.images) && product.images.length > 1;
  const mainImage =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images[0]
      : "/no-image.png";
  const hoverImage =
    hasSecondImage ? product.images[1] : mainImage;

  return (
    <Card
      className="w-full max-w-[280px] mx-auto bg-white shadow border border-gray-100"
      style={{ borderRadius: 0 }}
    >
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative cursor-pointer"
        style={{ borderRadius: 0 }}
      >
        {/* Tỉ lệ ảnh 3:5 (chiều dài lớn hơn chiều rộng) */}
        <div
          className={`flex items-center justify-center w-full aspect-[3/5] transition-all duration-300 ${
            hovered ? "bg-white shadow-lg" : ""
          }`}
          style={{ minHeight: 0, borderRadius: 0 }}
        >
          <img
            src={hovered ? hoverImage : mainImage}
            alt={product?.title}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              hovered ? "scale-95" : "scale-100"
            }`}
            style={{
              background: "#fff",
              borderRadius: 0,
              aspectRatio: "3/5",
            }}
          />
          {/* Badge trạng thái */}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs px-2 py-0.5">
              Hết hàng
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs px-2 py-0.5">
              {`Chỉ còn ${product?.totalStock}`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs px-2 py-0.5">
              Sale
            </Badge>
          ) : null}
          {/* Nút khi hover */}
          <div
            className={`absolute left-1/2 bottom-6 -translate-x-1/2 flex gap-3 bg-white rounded-xl shadow-md px-4 py-2 transition-all duration-300 ${
              hovered
                ? "opacity-100 pointer-events-auto translate-y-0"
                : "opacity-0 pointer-events-none translate-y-4"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
              className="rounded-full"
              title="Thêm vào giỏ"
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleGetProductDetails(product?._id)}
              className="rounded-full"
              title="Xem chi tiết"
            >
              <Eye className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <CardContent className="pt-3 pb-1 px-3">
          <div className="text-[13px] text-gray-400 tracking-widest font-semibold mb-1 uppercase">
            {brandOptionsMap[product?.brand] || ""}
          </div>
          <h2 className="text-[18px] font-medium mb-1 text-gray-900 leading-tight">
            {product?.title}
          </h2>
          <div className="text-[19px] font-bold text-red-600 mb-1 leading-tight">
            {product?.salePrice > 0
              ? product?.salePrice.toLocaleString("vi-VN") + "₫"
              : product?.price.toLocaleString("vi-VN") + "₫"}
          </div>
          {product?.salePrice > 0 && (
            <div className="text-[15px] text-gray-400 line-through leading-tight">
              {product?.price.toLocaleString("vi-VN")}₫
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
