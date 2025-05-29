const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    images: [String], // Đổi từ image: String sang images: [String]
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

ProductSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Product", ProductSchema);