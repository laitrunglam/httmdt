// ✅ 2. File: components/admin-view/orders.jsx

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
  });

  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const handleFetchOrderDetails = (id) => {
    dispatch(getOrderDetailsForAdmin(id));
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
        <Button onClick={() => setOpenCreateDialog(true)}>Thêm đơn hàng</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID đơn hàng</TableHead>
              <TableHead>ID người dùng</TableHead> {/* 👈 Thêm cột User ID */}
              <TableHead>Ngày đặt hàng</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Đơn giá</TableHead>
              <TableHead>Hoạt động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList?.length > 0 ? orderList.map((orderItem) => (
              <TableRow key={orderItem._id}>
                <TableCell>{orderItem._id}</TableCell>
                <TableCell>{orderItem.userId}</TableCell>
                <TableCell>{orderItem?.orderDate?.split("T")[0]}</TableCell>
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
                <TableCell colSpan={6} className="text-center">Không có đơn hàng.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Dialog: Chi tiết đơn hàng */}
      <Dialog open={openDetailsDialog} onOpenChange={() => { setOpenDetailsDialog(false); dispatch(resetOrderDetails()); }}>
      <AdminOrderDetailsView
  orderDetails={orderDetails}
  onUpdate={() => {
    dispatch(getAllOrdersForAdmin());
    setOpenDetailsDialog(false);
    dispatch(resetOrderDetails());
  }}
/>
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
