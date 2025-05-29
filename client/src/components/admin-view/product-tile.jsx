import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "lucide-react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const [hovered, setHovered] = useState(false);

  // Lấy ảnh đầu tiên từ mảng images, fallback nếu không có
  const mainImage =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images[0]
      : "/no-image.png";

  return (
    <Card
      className="w-full max-w-[280px] mx-auto bg-white shadow border border-gray-100"
      style={{ borderRadius: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <div
          className="flex items-center justify-center w-full aspect-[3/5]"
          style={{ minHeight: 0, borderRadius: 0 }}
        >
          <img
            src={mainImage}
            alt={product?.title}
            className="w-full h-full object-cover"
            style={{
              background: "#fff",
              borderRadius: 0,
              aspectRatio: "3/5",
            }}
          />
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setFormData(product);
              setCurrentEditedId(product._id);
              setOpenCreateProductsDialog(true);
            }}
            title="Sửa"
          >
            <PencilIcon className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleDelete(product._id)}
            title="Xóa"
          >
            <TrashIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <CardContent className="pt-3 pb-1 px-3">
        <div className="text-[13px] text-gray-400 tracking-widest font-semibold mb-1 uppercase">
          {product?.brand || ""}
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
    </Card>
  );
}

export default AdminProductTile;
