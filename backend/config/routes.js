const userRoutes = require("../routes/user");
const settingsRoutes = require("../routes/settings");
const orderRoutes = require("../routes/order");
const mapFileRoutes = require("../routes/mapFile");
const path=require("path");
const { isAuth } = require("../middlewares/auth-checker");

module.exports = function (app) {  
    app.use('/api', mapFileRoutes);
    app.use('/api', isAuth);     

    app.use('/api', userRoutes);
    app.use('/api', settingsRoutes);
    app.use('/api', orderRoutes);

    app.use((err, req, res, next) => {
        console.log('In error hander middleware', req.path, err);
        let status;
        (err.status) ? status = err.status : status = 500;
        console.log({ success: err.success, message: err.message, status });
        res.status(status).send({ success: err.success? err.success :  false, message: err.message });
    });
}