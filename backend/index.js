const express = require("express");
const app = express();
const path=require("path");
const fs = require("fs");
const scheduler = require("./scheduler");

require("dotenv").config({ path: path.join(__dirname, '.env') });

require("./config/middleware")(app);
require("./config/dbconnection")(app);
require("./config/routes")(app);
scheduler.initOrderCreateScheduler();
scheduler.initOrderUpdateScheduler();
scheduler.initOrderUpdateBulkOperation();
// scheduler.initOrderDeleteScheduler();
app.get("/", (req, res) => res.send("<h2>Maps Of The Past APP Running...</h2>"))
// app.use(express.static('assets'));
// app.use(express.static(path.join(__dirname,'assets')));

module.exports = app;