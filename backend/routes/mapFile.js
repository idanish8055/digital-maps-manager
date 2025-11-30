const express = require('express');
const ROUTER = express.Router();
const MapFileController = require("../controllers/MapFileController");

ROUTER.get("/file/:order_id/items/:id/", MapFileController.downloadFile);
ROUTER.get("/wildarts-file/:order_id/items/:id/", MapFileController.downloadFileWildArts);

module.exports = ROUTER;