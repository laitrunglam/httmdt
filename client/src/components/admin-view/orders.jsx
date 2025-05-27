import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
  createOrderByAdmin,
  deleteOrderByAdmin,
} from "@/store/admin/order-slice";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import CommonForm from "../common/form";
import AdminOrderDetailsView from "./order-details";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    cartItems: [],
    addressInfo: {},
    totalAmount: "",
    paymentMethod: "Cash",
    orderStatus: "pending",
    estimatedDeliveryDate: "", // ✅ dùng đúng tên field
  });

  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const handleFetchOrderDetails = (id) => {
    dispatch(getOrderDetailsForAdmin(id));
    setOpenDetailsDialog(true);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createOrderByAdmin(formData)).then(() => {
      setOpenCreateDialog(false);
      setFormData({
        userId: "",
        cartItems: [],
        addressInfo: {},
        totalAmount: "",
        paymentMethod: "Cash",
        orderStatus: "pending",
        estimatedDeliveryDate: "",
      });
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteOrderByAdmin(id));
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Toàn bộ đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden">ID đơn hàng</TableHead>
              <TableHead className="hidden">ID người dùng</TableHead>
              <TableHead>Ngày đặt hàng</TableHead>
              <TableHead>Ngày giao dự kiến</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Đơn giá</TableHead>
              <TableHead>Hoạt động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList?.length > 0 ? orderList.map((orderItem) => (
              <TableRow key={orderItem._id}>
                <TableCell className="hidden">{orderItem._id}</TableCell>
                <TableCell className="hidden">{orderItem.userId}</TableCell>
                <TableCell>{orderItem?.orderDate?.split("T")[0]}</TableCell>
                <TableCell>
                  {orderItem?.estimatedDeliveryDate
                    ? orderItem.estimatedDeliveryDate.split("T")[0]
                    : "Chưa có"}
                </TableCell>
                <TableCell>
                  <Badge className={`py-1 px-3 ${
                    orderItem.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : orderItem.orderStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-black"
                  }`}>
                    {orderItem.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell>${orderItem.totalAmount}</TableCell>
                <TableCell className="space-x-2">
                  <Button onClick={() => handleFetchOrderDetails(orderItem._id)}>Chi tiết</Button>
                  <Button variant="destructive" onClick={() => handleDelete(orderItem._id)}>Xóa</Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">Không có đơn hàng.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Dialog: Chi tiết đơn hàng */}
      <Dialog
        open={openDetailsDialog}
        onOpenChange={(isOpen) => {
          setOpenDetailsDialog(isOpen);
          if (!isOpen) dispatch(resetOrderDetails());
        }}
      >
        <AdminOrderDetailsView />
      </Dialog>

      {/* Dialog: Tạo đơn hàng */}
      <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
        <DialogContent>
          <CommonForm
            formControls={[
              { label: "ID người dùng", name: "userId", componentType: "input" },
              { label: "Thành tiền", name: "totalAmount", componentType: "input" },
              {
                label: "Phương pháp thanh toán", name: "paymentMethod", componentType: "select",
                options: [ { id: "Cash", label: "Tiền mặt" }, { id: "ZaloPay", label: "ZaloPay" } ]
              },
              {
                label: "Trạng thái đơn hàng", name: "orderStatus", componentType: "select",
                options: [
                  { id: "pending", label: "Đang chờ" },
                  { id: "confirmed", label: "Xác nhận" },
                  { id: "rejected", label: "Hủy đơn" }
                ]
              },
              {
                label: "Ngày giao dự kiến",
                name: "estimatedDeliveryDate", // ✅ dùng đúng tên để khớp backend
                componentType: "input",
                type: "date"
              }
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Tạo đơn hàng"
            onSubmit={handleCreate}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default AdminOrdersView;
