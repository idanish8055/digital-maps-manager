const express = require('express');
const ROUTER = express.Router();
const SettingsController = require('../controllers/SettingsController');
const {asyncErrorHandler} = require('../middlewares/asyncHandler');

ROUTER.get('/settings/store', asyncErrorHandler(SettingsController.getSettings));
ROUTER.put('/settings/store/update', asyncErrorHandler(SettingsController.updateSettings));
ROUTER.get('/settings/template', asyncErrorHandler(SettingsController.getEmailTemplate));
ROUTER.put('/settings/template/update', asyncErrorHandler(SettingsController.updateEmailTemplate));

module.exports = ROUTER;