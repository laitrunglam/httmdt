const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import các router
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes"); // ✅ THÊM DÒNG NÀY

const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");
const paymentRoutes = require("./routes/payment.routes");

const adminOrdersRouter = require("./routes/admin/orders-routes");

const chatbotRouter = require("./routes/chatbot/chatbot-routes");

//create a database connection -> u can also
//create a separate file for this and then import/use that file here
//mongodb://localhost:27017

mongoose
  .connect("mongodb+srv://khoabestsion:001203005908@cluster0.sccobrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// Middleware cơ bản
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter); // ✅ GẮN ROUTER ĐƠN HÀNG

app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/payment", paymentRoutes);
app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/admin/orders", adminOrdersRouter);

app.use("/api/chatbot", chatbotRouter);
// Khởi chạy server
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
