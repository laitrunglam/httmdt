const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment.controller');

router.post('/', paymentController.createPayment);
router.post('/callback', paymentController.handleCallback);
router.post('/check-status-order', paymentController.checkOrderStatus);


module.exports = router;
