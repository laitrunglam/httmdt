const Order = require("../../models/Order");

const createOrderByAdmin = async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentStatus: req.body.paymentMethod === "ZaloPay" ? "paid" : "unpaid",
    });
    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteOrderByAdmin = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Thêm hàm: lấy chi tiết đơn hàng theo ID
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

const updateOrderStatusByAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.orderStatus = req.body.orderStatus || order.orderStatus;
    order.orderUpdateDate = new Date();
    await order.save();

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // lấy tất cả đơn hàng
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
  getAllOrdersForAdmin, // 👈 export thêm
};
