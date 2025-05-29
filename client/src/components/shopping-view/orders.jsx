import { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import { X, Star } from "lucide-react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useToast } from "../ui/use-toast";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [showReviewBox, setShowReviewBox] = useState(null); // orderId đang mở review
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewImages, setReviewImages] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [productId, setReviewProductId] = useState(null);
  const fileInputRef = useRef();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const { toast } = useToast();

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetails(getId));
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  function handleRatingChange(star) {
    setRating(star);
  }

  function handleImageChange(e) {
    setReviewImages(Array.from(e.target.files));
  }

  function handleAddReview(productId) {
    // Kiểm tra user đã đăng nhập chưa
    if (!user?.id) {
      toast({ title: "Bạn cần đăng nhập để gửi đánh giá!" });
      return;
    }

    dispatch(
      addReview({
        productId,
        userId: user.id,
        userName: user.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    )
      .then((data) => {
        if (data && data.payload && data.payload.success) {
          setRating(0);
          setReviewMsg("");
          setShowReviewBox(null);
          setShowReviewModal(false);
          dispatch(getReviews(productId));
          toast({ title: "Thêm đánh giá thành công!" });
        } else {
          toast({
            title:
              data?.payload?.message ||
              "Không thể gửi đánh giá. Vui lòng thử lại!",
          });
        }
      })
      .catch(() => {
        toast({ title: "Có lỗi xảy ra khi gửi đánh giá!" });
      });
  }

  // Mở modal đánh giá
  const openReviewModal = (productId) => {
    setReviewProductId(productId);
    setShowReviewModal(true);
  };

  // Đóng modal đánh giá
  const closeReviewModal = () => {
    setReviewProductId(null);
    setShowReviewModal(false);
    setRating(0);
    setReviewMsg("");
    setReviewImages([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lịch sử đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Ngày giao dự kiến</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>
                <span className="sr-only">Chi tiết</span>
              </TableHead>
              <TableHead>
                <span className="sr-only">Đánh giá</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <TableRow key={orderItem?._id}>
                  <TableCell>{formatDate(orderItem?.orderDate)}</TableCell>
                  <TableCell>
                    {formatDate(orderItem?.estimatedDeliveryDate)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem?.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-gray-600"
                      }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {orderItem?.totalAmount?.toLocaleString("vi-VN")}₫
                  </TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() =>
                          handleFetchOrderDetails(orderItem?._id)
                        }
                      >
                        Xem chi tiết
                      </Button>
                      <ShoppingOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => openReviewModal(orderItem?.cartItems.productId)}
                    >
                      Đánh giá
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Không có đơn hàng nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Modal đánh giá nổi giữa trang */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-auto animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
              onClick={closeReviewModal}
              aria-label="Đóng"
            >
              <X className="w-7 h-7" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
              Đánh giá sản phẩm
            </h2>
            <div className="flex gap-2 justify-center mb-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-9 h-9 cursor-pointer transition-colors duration-150 ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => handleRatingChange(star)}
                  fill={star <= rating ? "#facc15" : "none"}
                  onMouseOver={() => setRating(star)}
                  onMouseOut={() => setRating(rating)}
                />
              ))}
            </div>
            <textarea
              value={reviewMsg}
              onChange={(e) => setReviewMsg(e.target.value)}
              placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-blue-400 resize-none"
              rows={4}
            />

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg transition-colors"
              onClick={() => handleAddReview(productId)}
              disabled={reviewMsg.trim() === "" || rating === 0}
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default ShoppingOrders;
