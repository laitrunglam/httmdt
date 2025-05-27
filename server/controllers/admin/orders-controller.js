const Order = require("../../models/Order");

// ✅ Tạo đơn hàng mới (Admin)
const createOrderByAdmin = async (req, res) => {
  try {
    const {
      cartItems,
      totalAmount,
      paymentMethod,
      addressInfo,
      estimatedDeliveryDate,
    } = req.body;

    if (!cartItems || !totalAmount || !paymentMethod || !addressInfo) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newOrder = new Order({
      cartItems,
      totalAmount,
      paymentMethod,
      addressInfo,
      estimatedDeliveryDate: estimatedDeliveryDate
        ? new Date(estimatedDeliveryDate)
        : null,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      orderStatus: "pending",
      paymentStatus: paymentMethod === "ZaloPay" ? "paid" : "unpaid",
    });

    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Xóa đơn hàng (Admin)
const deleteOrderByAdmin = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Lấy chi tiết đơn hàng theo ID (Admin)
const getOrderDetailsByAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Cập nhật trạng thái đơn hàng (Admin)
const updateOrderStatusByAdmin = async (req, res) => {
  try {
    const { orderStatus, orderDate, estimatedDeliveryDate } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Validate enum orderStatus
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (orderStatus && !validStatuses.includes(orderStatus)) {
      return res.status(400).json({ success: false, message: "Invalid orderStatus value" });
    }

    if (orderDate && isNaN(new Date(orderDate).getTime())) {
      return res.status(400).json({ success: false, message: "Invalid orderDate format" });
    }

    if (estimatedDeliveryDate && isNaN(new Date(estimatedDeliveryDate).getTime())) {
      return res.status(400).json({ success: false, message: "Invalid estimatedDeliveryDate format" });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (orderDate) order.orderDate = new Date(orderDate);
    if (estimatedDeliveryDate) order.estimatedDeliveryDate = new Date(estimatedDeliveryDate);

    order.orderUpdateDate = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
};


// ✅ Lấy tất cả đơn hàng (Admin)
const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createOrderByAdmin,
  deleteOrderByAdmin,
  getOrderDetailsByAdmin,
  updateOrderStatusByAdmin,
  getAllOrdersForAdmin,
};
