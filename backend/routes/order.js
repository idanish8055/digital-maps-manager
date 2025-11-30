const express = require('express');
const ROUTER = express.Router();
const OrderController = require('../controllers/OrderController');
const {asyncErrorHandler} = require('../middlewares/asyncHandler');

ROUTER.get('/orders/webhook', OrderController.getOrderCreateWebhook);
ROUTER.get('/orders/:id', OrderController.getOrder);
ROUTER.post('/orders/email/resend', OrderController.resendEmailToCustomer);

ROUTER.post('/orders', OrderController.deleteOrderFromDB);
ROUTER.get('/orders', OrderController.getAllOrders);
ROUTER.put('/order/update/limit', OrderController.updateDownloadLimit);
ROUTER.get('/orders/create/file', OrderController.createFileandUpdateDB);

module.exports = ROUTER;