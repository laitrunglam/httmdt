import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useState } from "react";
import AdminProductDetails from "./product-details";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div
          className="relative cursor-pointer"
          onClick={() => setShowDetails(true)}
        >
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2
            className="text-xl font-bold mb-2 mt-2 cursor-pointer"
            onClick={() => setShowDetails(true)}
          >
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              {product?.price}₫
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">{product?.salePrice}₫</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Sửa
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Xóa</Button>
        </CardFooter>
        {showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded shadow-lg max-w-lg w-full relative">
              <AdminProductDetails
                productId={product._id}
                onClose={() => setShowDetails(false)}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default AdminProductTile;
