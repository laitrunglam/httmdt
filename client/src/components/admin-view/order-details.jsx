import { useState, useEffect } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

function AdminOrderDetailsView() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const orderDetails = useSelector((state) => state.adminOrder.orderDetails);

  const [formData, setFormData] = useState({
    status: "",
    orderDate: "",
    estimatedDeliveryDate: "",
  });

  useEffect(() => {
    if (orderDetails) {
      setFormData({
        status: orderDetails.orderStatus || "",
        orderDate: orderDetails.orderDate?.split("T")[0] || "",
        estimatedDeliveryDate: orderDetails.estimatedDeliveryDate?.split("T")[0] || "",
      });
    }
  }, [orderDetails]);

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status, orderDate, estimatedDeliveryDate } = formData;

    dispatch(
      updateOrderStatus({
        id: orderDetails?._id,
        orderStatus: status,
        orderDate,
        estimatedDeliveryDate,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        toast({ title: data?.payload?.message });
      } else {
        toast({ title: "Cập nhật thất bại", variant: "destructive" });
      }
    });
  }

  const statusMap = {
    pending: { label: "Đang chờ", color: "bg-black" },
    processing: { label: "Đang xử lý", color: "bg-yellow-600" },
    shipped: { label: "Đang vận chuyển", color: "bg-blue-600" },
    delivered: { label: "Giao hàng thành công", color: "bg-green-500" },
    cancelled: { label: "Từ chối đơn hàng", color: "bg-red-600" },
  };

  const currentStatus = statusMap[orderDetails?.orderStatus] || {
    label: orderDetails?.orderStatus || "Không xác định",
    color: "bg-gray-600",
  };

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Ngày giao dự kiến</p>
            <Label>{orderDetails?.estimatedDeliveryDate?.split("T")[0] || "Chưa có"}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Đơn giá</p>
            <Label>{orderDetails?.totalAmount}₫</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Phương pháp thanh toán</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Trạng thái thanh toán</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Trạng thái đơn hàng</p>
            <Label>
              <Badge className={`py-1 px-3 ${currentStatus.color}`}>
                {currentStatus.label}
              </Badge>
            </Label>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Chi tiết đơn hàng</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems?.length > 0 &&
                orderDetails.cartItems.map((item) => (
                  <li key={item._id || item.productId} className="flex items-center justify-between">
                    <span>Title: {item.title}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: {item.price}₫</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Thông tin vận chuyển</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Trạng thái vận chuyển",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Đang chờ" },
                  { id: "processing", label: "Đang xử lý" },
                  { id: "shipped", label: "Đang vận chuyển" },
                  { id: "delivered", label: "Giao hàng thành công" },
                  { id: "cancelled", label: "Từ chối đơn hàng" },
                ],
              },
              {
                label: "Ngày giao dự kiến",
                name: "estimatedDeliveryDate",
                componentType: "date",
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Cập nhật trạng thái đơn hàng"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
