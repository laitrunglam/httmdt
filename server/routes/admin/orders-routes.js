const express = require("express");
const router = express.Router(); // ✅ Đặt đúng chỗ
const Order = require("../../models/Order"); // đường dẫn đúng tới model
const {
  createOrderByAdmin,
  deleteOrderByAdmin,
  getOrderDetailsByAdmin,
  updateOrderStatusByAdmin,
  getAllOrdersForAdmin
} = require("../../controllers/admin/orders-controller");

router.post("/create", createOrderByAdmin);
router.delete("/delete/:id", deleteOrderByAdmin);
router.get("/details/:id", getOrderDetailsByAdmin); // ✅ Route xem chi tiết đơn hàng
router.put("/update/:id", updateOrderStatusByAdmin);
router.get("/details/:id", getAllOrdersForAdmin);
router.get("/get", async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
module.exports = router;
