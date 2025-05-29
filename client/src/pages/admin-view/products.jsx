import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const initialFormData = {
  images: [], // đổi từ image: null sang images: []
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFiles, setImageFiles] = useState([]); // đổi từ imageFile sang imageFiles (array)
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // đổi sang mảng
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [sort, setSort] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData: { ...formData, images: uploadedImageUrls },
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            images: uploadedImageUrls,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFiles([]);
            setUploadedImageUrls([]);
            setFormData(initialFormData);
            toast({
              title: "Product add successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) =>
        key === "images"
          ? uploadedImageUrls.length > 0
          : formData[key] !== ""
      )
      .every((item) => item);
  }

  function handleSort(value) {
    setSort(value);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const sortedProductList = [...(productList || [])];
  if (sort === "price-lowtohigh") {
    sortedProductList.sort((a, b) => a.price - b.price);
  } else if (sort === "price-hightolow") {
    sortedProductList.sort((a, b) => b.price - a.price);
  } else if (sort === "stock-lowtohigh") {
    sortedProductList.sort((a, b) => a.totalStock - b.totalStock);
  } else if (sort === "stock-hightolow") {
    sortedProductList.sort((a, b) => b.totalStock - a.totalStock);
  }

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-between items-center">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Thêm sản phẩm
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowUpDownIcon className="h-4 w-4" />
              <span>Sắp xếp</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
              <DropdownMenuRadioItem value="price-lowtohigh">Giá tăng dần</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-hightolow">Giá giảm dần</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="stock-lowtohigh">Tồn kho tăng dần</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="stock-hightolow">Tồn kho giảm dần</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b w-10 text-center">
                {/* Checkbox chọn tất cả */}
                <input
                  type="checkbox"
                  onChange={e => {
                    if (e.target.checked) {
                      setSelectedIds(productList.map(p => p._id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                  checked={selectedIds.length === productList.length && productList.length > 0}
                />
              </th>
              <th className="p-3 border-b w-10 text-center">STT</th>
              <th className="p-3 border-b">Ảnh</th>
              <th className="p-3 border-b">Tên</th>
              <th className="p-3 border-b">Danh mục</th>
              <th className="p-3 border-b">Giá</th>
              <th className="p-3 border-b text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {productList && productList.length > 0 ? (
              productList.map((productItem, idx) => (
                <tr key={productItem.id || productItem._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-center align-middle">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(productItem._id)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedIds(prev => [...prev, productItem._id]);
                        } else {
                          setSelectedIds(prev => prev.filter(id => id !== productItem._id));
                        }
                      }}
                    />
                  </td>
                  <td className="p-3 text-center align-middle">{idx + 1}</td>
                  <td className="p-3 align-middle">
                    <img
                      src={
                        Array.isArray(productItem.images) && productItem.images.length > 0
                          ? productItem.images[0]
                          : "/no-image.png"
                      }
                      alt={productItem.title}
                      className="w-16 h-20 object-cover border"
                    />
                  </td>
                  <td className="p-3 font-medium align-middle">{productItem.title}</td>
                  <td className="p-3 align-middle">{productItem.category}</td>
                  <td className="p-3 text-red-600 font-bold align-middle">
                    {productItem.salePrice > 0
                      ? productItem.salePrice.toLocaleString("vi-VN") + "₫"
                      : productItem.price.toLocaleString("vi-VN") + "₫"}
                  </td>
                  <td className="p-3 align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        title="Xem chi tiết"
                        onClick={() => {
                          setFormData(productItem);
                          setCurrentEditedId(productItem._id);
                          setUploadedImageUrls(productItem.images || []);
                          setImageFiles([]);
                          setOpenCreateProductsDialog(true);
                        }}
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        title="Sửa"
                        onClick={() => {
                          setFormData(productItem);
                          setCurrentEditedId(productItem._id);
                          setUploadedImageUrls(productItem.images || []); // <-- Thêm dòng này
                          setImageFiles([]); // <-- Reset file local
                          setOpenCreateProductsDialog(true);
                        }}
                      >
                        <Pencil className="w-5 h-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        title="Xóa"
                        onClick={() => handleDelete(productItem._id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  Không có sản phẩm nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Nút xóa nhiều */}
        <div className="mt-4">
          <Button
            variant="destructive"
            disabled={!selectedIds || selectedIds.length === 0}
            onClick={() => {
              selectedIds.forEach(id => handleDelete(id));
              setSelectedIds([]);
            }}
          >
            Xóa các sản phẩm đã chọn
          </Button>
        </div>
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          setUploadedImageUrls([]); // <-- Reset lại
          setImageFiles([]);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            uploadedImageUrls={uploadedImageUrls}
            setUploadedImageUrls={setUploadedImageUrls}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
