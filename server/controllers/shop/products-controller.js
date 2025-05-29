const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};



const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Lấy chi tiết sản phẩm chính
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    // lấy comment của sản phẩm
    const reviews = await ProductReview.find({ productId: id });

    // Lấy danh sách sản phẩm liên quan (ví dụ cùng loại)
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }, // loại trừ chính nó
    }).limit(4);

    // Ví dụ: đếm số đơn hàng đã bán sản phẩm này (giả sử có Order model)
    // const soldCount = await Order.countDocuments({
    //   'items.productId': product._id,
    // });

    // Gộp kết quả trả về
    res.status(200).json({
      success: true,
      data: {
        product, // chuyển Mongoose document sang object JS
        relatedProducts,
        reviews,
//        soldCount,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};



module.exports = { getFilteredProducts, getProductDetails };
