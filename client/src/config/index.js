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
    label: "Phân loại",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Đàn ông" },
      { id: "women", label: "Phụ nữ" },
      { id: "kids", label: "Trẻ em" },
      { id: "accessories", label: "Phụ kiện" },
      { id: "footwear", label: "Giày dép" },
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
    label: "Giá",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá",
  },
  {
    label: "Giá khuyến mãi",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá khuyến mãi (nếu có)",
  },
  {
    label: "Hàng trong kho",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Nhập số lượng hàng trong kho",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Sản phẩm",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Đàn ông",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Phụ nữ",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Trẻ em",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Giày dép",
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
  men: "Đàn ông",
  women: "Phụ nữ",
  kids: "Trẻ em",
  accessories: "Phụ kiện",
  footwear: "Giày dép",
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
    { id: "men", label: "Đàn ông" },
    { id: "women", label: "Phụ nữ" },
    { id: "kids", label: "Trẻ em" },
    { id: "accessories", label: "Phụ kiện" },
    { id: "footwear", label: "Giày dép" },
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
  { id: "price-lowtohigh", label: "Giá: Thấp đén cao" },
  { id: "price-hightolow", label: "Giá: Cao đến thấp" },
  { id: "title-atoz", label: "Tên: A đến Z" },
  { id: "title-ztoa", label: "Tên: Z đến A" },
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
    label: "Thành phố",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Nhập thành phố",
  },
  {
    label: "Mã bưu điện",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Nhập mã bưu điện",
  },
  {
    label: "Điện thoại",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Nhập số điện thoại",
  },
  {
    label: "Ghi chú",
    name: "notes",
    componentType: "textarea",
    placeholder: "Nhập ghi chú",
  },
];