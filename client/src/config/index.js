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
      { id: "men", label: "Nam" },
      { id: "women", label: "Nữ" },
      { id: "kids", label: "Trẻ em" },
      { id: "accessories", label: "Phụ kiện" },
      { id: "footwear", label: "Giày" },
    ],
  },
  {
    label: "Thương hiệu",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
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
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Sản phẩm",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Nam",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Nữ",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Trẻ em",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Giày",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Phụ kiện",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Tìm kiếm",
    path: "/shop/search",   
  },
];

export const categoryOptionsMap = {
  men: "Nam",
  women: "Nữ",
  kids: "Trẻ em",
  accessories: "Phụ kiện",
  footwear: "Giày",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Nam" },
    { id: "women", label: "Nữ" },
    { id: "kids", label: "Trẻ em" },
    { id: "accessories", label: "Phụ kiện" },
    { id: "footwear", label: "Giày" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
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