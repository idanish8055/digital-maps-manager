const express = require('express');
const ROUTER = express.Router();
const UserController = require('../controllers/UserController');
const {asyncErrorHandler} =  require('../middlewares/asyncHandler');

// const fileUpload = require('../middleware/file-upload');

ROUTER.post('/user/signup', asyncErrorHandler(UserController.auth));
ROUTER.post('/user/login', asyncErrorHandler(UserController.login));
ROUTER.post('/user/logout', asyncErrorHandler(UserController.logout));
ROUTER.post('/user/otp/verify', asyncErrorHandler(UserController.otpVerification));
ROUTER.post('/user/otp/resend', asyncErrorHandler(UserController.otpResend));
ROUTER.get('/user/index', UserController.index);
ROUTER.post('/user/password/reset', UserController.resetPassword);
ROUTER.put('/user/password/change', UserController.changePassword);
ROUTER.get('/user/get-users', asyncErrorHandler(UserController.getAllUsers));
ROUTER.get('/user/refresh/token', asyncErrorHandler(UserController.refreshUserToken));
ROUTER.get('/user/info', asyncErrorHandler(UserController.getUserInformation));

module.exports = ROUTER;