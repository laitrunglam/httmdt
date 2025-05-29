import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFiles,
  setImageFiles,
  imageLoadingState,
  uploadedImageUrls,
  setUploadedImageUrls,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      // Thêm ảnh mới vào danh sách cũ
      setImageFiles((prev) => [...prev, ...files]);
      // Reset input để có thể chọn lại cùng file nếu muốn
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files || []);
    if (files.length > 0) {
      setImageFiles((prev) => [...prev, ...files]);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemoveImage(idx) {
    const newFiles = [...imageFiles];
    newFiles.splice(idx, 1);
    setImageFiles(newFiles);

    const newUrls = [...uploadedImageUrls];
    newUrls.splice(idx, 1);
    setUploadedImageUrls(newUrls);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImagesToCloudinary() {
    setImageLoadingState(true);
    const urls = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const data = new FormData();
      data.append("my_file", imageFiles[i]);
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
      if (response?.data?.success) {
        urls.push(response.data.result.url);
      }
    }
    setUploadedImageUrls(urls);
    setImageLoadingState(false);
  }

  useEffect(() => {
    if (imageFiles && imageFiles.length > 0) uploadImagesToCloudinary();
    // eslint-disable-next-line
  }, [imageFiles]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Đăng nhiều ảnh</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
          multiple
        />
        {(!imageFiles || imageFiles.length === 0) ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? "cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Kéo & thả hoặc click để tải nhiều ảnh</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex flex-col gap-2">
            {imageFiles.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between border rounded px-2 py-1 bg-gray-50">
                <div className="flex items-center gap-2">
                  <FileIcon className="w-6 text-primary h-6" />
                  <span className="text-sm">{file.name}</span>
                  {uploadedImageUrls[idx] && (
                    <a
                      href={uploadedImageUrls[idx]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline ml-2"
                    >
                      Xem ảnh
                    </a>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemoveImage(idx)}
                  disabled={isEditMode}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Xóa</span>
                </Button>
              </div>
            ))}
            {/* Nút Thêm ảnh */}
            <Button
              type="button"
              variant="outline"
              className="mt-2 w-fit self-center"
              onClick={() => inputRef.current && inputRef.current.click()}
              disabled={isEditMode}
            >
              + Thêm ảnh
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
