export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Nhập User name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Nhập email của bạn",
    componentType: "input",
    type: "email",
  },
  {
    name: "password", 
    label: "Mật Khẩu",
    placeholder: "Nhập mật khẩu của bạn",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Nhập email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Mật Khẩu",
    placeholder: "Nhập mật khẩu",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Tên",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Nhập tên sản phẩm",
  },
  {
    label: "Mô tả",
    name: "description",
    componentType: "textarea",
    placeholder: "Nhập mô tả sản phẩm",
  },
  {
    label: "Danh mục",
    name: "category",
    componentType: "select",
    options: [
      { id: "dress", label: "Váy (Đầm)" },
      { id: "shirt", label: "Áo" },
      { id: "pants", label: "Quần" },
      { id: "skirt", label: "Chân váy" },
      { id: "accessories", label: "Phụ kiện" },
    ],
  },
  {
    label: "Thương hiệu",
    name: "brand",
    componentType: "select",
    options: [
      { id: "louisvuitton", label: "Louis Vuitton" }, // Đổi từ nike thành louis vuitton
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Giá gốc",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá sản phẩm",
  },
  {
    label: "Giá khuyến mãi",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá khuyến mãi (nếu có)",
  },
  {
    label: "Kho hàng",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Nhập số lượng sản phẩm trong kho",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Trang chủ",
    path: "/",
  },
  // {
  //   id: "products",
  //   label: "Sản phẩm",
  //   path: "/shop/listing",
  // },
  {
    id: "dress",
    label: "Váy (Đầm)",
    path: "/shop/listing?category=dress",
  },
  {
    id: "shirt",
    label: "Áo",
    path: "/shop/listing?category=shirt",
  },
  {
    id: "pants",
    label: "Quần",
    path: "/shop/listing?category=pants",
  },
  {
    id: "skirt",
    label: "Chân váy",
    path: "/shop/listing?category=skirt",
  },
  {
    id: "accessories",
    label: "Phụ kiện",
    path: "/shop/listing?category=accessories",
  },
  {
    id: "search",
    label: "Tìm kiếm",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  dress: "Váy (Đầm)",
  shirt: "Áo",
  pants: "Quần",
  skirt: "Chân váy",
  accessories: "Phụ kiện",
};

export const brandOptionsMap = {
  louisvuitton: "Louis Vuitton", // Đổi từ nike thành louis vuitton
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "dress", label: "Váy (Đầm)" },
    { id: "shirt", label: "Áo" },
    { id: "pants", label: "Quần" },
    { id: "skirt", label: "Chân váy" },
    { id: "accessories", label: "Phụ kiện" },
  ],
  brand: [
    { id: "louisvuitton", label: "Louis Vuitton" }, // Đổi từ nike thành louis vuitton
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Giá: Thấp → cao" },
  { id: "price-hightolow", label: "Giá: Cao → thấp" },
  { id: "title-atoz", label: "Tên: A → Z  " },
  { id: "title-ztoa", label: "Title: Z → A" },
];

export const addressFormControls = [
  {
    label: "Địa chỉ",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Nhập địa chỉ",
  },
  {
    label: "Tỉnh/Thành phố",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Nhập tỉnh/thành phố",
  },
  {
    label: "Quận/Huyện",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Nhập quận/huyện",
  },
  {
    label: "Số điện thoại",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Nhập số điện thoại",
  },
  {
    label: "Ghi chú", 
    name: "notes",
    componentType: "textarea",
    placeholder: "Nhập ghi chú (nếu có)",
  },
];