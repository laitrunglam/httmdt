const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment');
const qs = require('qs');
const config = require('../configs/zalopay.config');

const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createPayment = async (req, res) => {
  const { amount, username,user_id } = req.body;

  if (!amount || !username) {
    return res.status(400).json({ error: 'Missing amount or username' });
  }

  const embed_data = {
    redirecturl: 'http://localhost:5173/shop/checkout',
    user_id
  };

  const items = [];
  const transID = Math.floor(Math.random() * 1000000);

  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
    app_user: username,
    user_id,
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: parseInt(amount),
    callback_url: 'https://a538-2405-4803-fd70-4e10-5d19-8c73-efdd-aa18.ngrok-free.app/api/payment/callback',
    description: `${username} - Thanh toán đơn hàng #${transID}`,
    bank_code: '',
  };
  
  const data = [
    config.app_id,
    order.app_trans_id,
    order.app_user,
    order.amount,
    order.app_time,
    order.embed_data,
    order.item,
  ].join('|');

    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString(CryptoJS.enc.Hex);

  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    return res.status(200).json(result.data);

  } catch (error) {
    console.log(error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.handleCallback = async (req, res) => {
  let result = {};

  try {
    const dataStr = req.body.data;
    const reqMac = req.body.mac;
    const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString(CryptoJS.enc.Hex);

    if (reqMac !== mac) {
      result.return_code = -1;
      result.return_message = 'MAC not match';
      return res.json(result);
    }

    const dataJson = JSON.parse(dataStr);
    const embed_data = JSON.parse(dataJson['embed_data']);
    const app_trans_id = dataJson['app_trans_id'];
    const username = dataJson['app_user'];
    const userId = embed_data.user_id;
    const amount = dataJson['amount'];

    console.log("✅ Thanh toán thành công - app_trans_id:", app_trans_id);

    // Tìm giỏ hàng và populate sản phẩm
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      console.log("❌ Không tìm thấy giỏ hàng cho user:", username);
      result.return_code = 0;
      result.return_message = 'Cart not found';
      return res.json(result);
    }

    // Chuyển item thành { title, price, quantity }
    const cartItems = cart.items.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    // Tạo đơn hàng
    const newOrder = new Order({
      userId: userId,
      cartId: cart._id,
      cartItems: cartItems,
      addressInfo: cart.addressInfo || {},
      orderStatus: 'delivered',
      paymentMethod: 'ZaloPay',
      paymentStatus: 'paid',
      totalAmount: amount,
      orderDate: moment().toISOString(),
      orderUpdateDate: moment().toISOString(),
      paymentId: app_trans_id,
      payerId: '',
      estimatedDeliveryDate: moment().add(5, 'days').toISOString(),
    });

    await newOrder.save();
    await Cart.findByIdAndDelete(cart._id);

    console.log("✅ Đã lưu đơn hàng:", newOrder._id);

    result.return_code = 1;
    result.return_message = 'success';
  } catch (ex) {
    console.log('❌ Callback error:', ex.message);
    result.return_code = 0;
    result.return_message = ex.message;
  }

  res.json(result);
};


exports.checkOrderStatus = async (req, res) => {
  const { app_trans_id } = req.body;

  const postData = {
    app_id: config.app_id,
    app_trans_id,
  };

  const data =
    postData.app_id + '|' + postData.app_trans_id + '|' + config.key1;
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  const postConfig = {
    method: 'post',
    url: config.query_endpoint,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(postData),
  };

  try {
    const result = await axios(postConfig);
    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Query failed' });
  }
};
