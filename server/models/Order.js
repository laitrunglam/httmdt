const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },  // <-- Đóng dấu ngoặc cho userId
  cartId: {
    type: String,
  },
  cartItems: [
    {
      productId: {
        type: String,
        required: true,
      },
      title: String,
      image: String,
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "processing", "shipped", "delivered", "cancelled","confirmed"],
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["COD", "ZaloPay", "PayPal"],
  },
  paymentStatus: {
    type: String,
    default: "unpaid",
    enum: ["unpaid", "paid"],
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  estimatedDeliveryDate: {
    type: Date,
    default: null,
  },
  orderUpdateDate: {
    type: Date,
    default: Date.now,
  },
  paymentId: String,
  payerId: String,
});

module.exports = mongoose.model("Order", OrderSchema);
