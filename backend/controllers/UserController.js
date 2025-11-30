const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mongoose, User } = require("../models/User");
const { Order} = require("../models/Order");
const crypto = require("crypto");
const { Mailer } = require("../components/mailer");
const emailTemplates = require("../utils/email-template");
const { validateSignupData, validateLoginData, validateResetPasswordData, validateChangePasswordData } = require("../validator/schema");
const { PrepareOrderAnalyticsData } = require("../components/PrepareOrderAnalyticsData");

class UserController {
    index(req, res) {
        console.log("Index controller");
        res.send({ page: "index page", secret: process.env.TOP_LEVEL_SECRET_KEY, "time": process.env.TOKEN_EXPIRES_IN });
    }
    auth = async (req, res) => {
        let user_id = new mongoose.Types.ObjectId().toString();
        
        let merchant = await this.getMerchant(req, { "role": "admin", email: req.body.email });
        if(!req.body.status)req.body.status = false; 
        let userIsExist = await User.findOne({ "email": req.body.email });
        const email_activation_token = crypto.randomBytes(32).toString("hex");
        
        try{
            await validateSignupData(req.body);
        }
        catch(error){
            throw {success: false, message: error.message, status: 403};
        }

        // console.log(!merchant || admin, merchant);

        if (userIsExist) {
            res.status(409).json({ success: false, message: "User already exist!" });
        }
        else if(!merchant){
            const user = await User.create({
                _id: user_id,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
                user_id: user_id,
                shop_details: undefined,
                role: req.body.role,
                status: false,
                email_activation_token: !merchant ? email_activation_token : undefined,
                email_activation_otp: !merchant ? Math.floor(100000 + Math.random() * 900000) : undefined,
                email_activation_timestamp: !merchant ? Date.now() + 900000 : undefined,
                price_settings: undefined,
                created_at: Date.now(),
                updated_at: Date.now()
            });

            console.log(merchant || !merchant, "HELLO", merchant, !merchant);
            try {
                await Mailer(req.body.email, "Email verification by Maps of the past", emailTemplates.vendorOTPverification(user.username, user.email_activation_otp));
            }
            catch (err) {
                console.log(err);
            }
            
            res.status(201).json({ success: true, user: {username: req.body.username, email_activation_token, email: req.body.email}, message: "Email has been sent!" });
        }
        else{
            res.status(409).json({ success: false, message: "Admin already exist!" });
        }
    }

    login = async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        try{
            await validateLoginData(req.body);
        }
        catch(error){
            throw {success: false, message: error.message, status: 403};
        }

        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                let token;
                try {
                    token = jwt.sign(
                        {
                            user_id: user.id,
                            email: user.email,
                            role: user.role,
                            merchant_id: user.role === "vendor" ? user.merchant_id : undefined,
                            status: user.role === "vendor" ? user.status : null
                        },
                        process.env.TOP_LEVEL_SECRET_KEY,
                        {
                            expiresIn: process.env.TOKEN_EXPIRES_IN
                        }
                    );
                    const payload = await jwt.verify(token, process.env.TOP_LEVEL_SECRET_KEY);
                    // addToken(req.redisClient, token, payload.exp, payload.iat);
                    if (user.role === "vendor") {
                        if (user.status) {
                            res.status(201).send({
                                user_id: user.id,
                                email: user.email,
                                role: user.role,
                                token,
                                expire: process.env.TOKEN_EXPIRES_IN,
                                status: user.status,
                                name: user.username
                            });
                        }
                        else if(!user.status && user.email_activation_otp){
                            const email_activation_token = crypto.randomBytes(32).toString("hex");
                            user.email_activation_token= email_activation_token;
                            user.email_activation_otp= Math.floor(100000 + Math.random() * 900000);
                            user.email_activation_timestamp= Date.now() + 900000;
                            user.save();
                            await Mailer(user.email, "Email verification by Maps of the past", emailTemplates.vendorOTPverification(user.username, user.email_activation_otp));
                            res.status(200).send({ success: false, message: "Two step authentication required.", email_activation_token });
                        }
                        else {
                            res.status(423).send({ success: false, message: "Can't logging you in, please connect with the admin" });
                        }
                    }
                    else {
                        res.status(201).send({
                            user_id: user.id,
                            email: user.email,
                            role: user.role,
                            token,
                            expire: process.env.TOKEN_EXPIRES_IN,
                            status: user.status,
                            name: user.username
                        });
                    }
                }
                catch (err) {
                    throw Object.assign(err);
                }
            }
            else {
                res.status(401).json({ success: false, message: "Invalid password" });
            }
        }
        else {
            res.status(403).send({ success: false, message: 'User not found!' });
        }
    }

    logout = async(req, res) => {
        const token = req.body.token;
        try{
            const decoded = jwt.verify(token, process.env.TOP_LEVEL_SECRET_KEY);
            // await blacklistToken(req.redisClient, token, decoded.exp, decoded.iat);
            res.status(201).send({success: true});
        }
        catch(err){
            throw Object.assign(err);
        }
    }

    otpVerification = async (req, res) => {
        const otp = req.body.otp;
        const token = req.body.token;
        console.log(token, "token otp",otp);
        let user = await User.findOne({ email_activation_token: token });
        console.log(token, "token",user);

        if(user){
            // let merchant = await this.getMerchant(req, { user_id: user.role === "admin" ? user.merchant_id : user.id });

            const current_date = Date.now();
            if(user.email_activation_timestamp > current_date){
                if(user.email_activation_otp === +otp){
                    user.email_activation_otp = undefined;
                    user.email_activation_timestamp = undefined;
                    user.email_activation_token = undefined;
                    user.save();
                    res.status(201).send({success: true, message: "OTP verified"});
                }
                else{
                    res.status(401).send({success: false, message: "OTP not verified"});
                }
            }
            else{
                res.status(401).send({success: false, message: "OTP expired"});
            }
        }
        else
        {
            res.status(401).send({success: false, message: "User isn't exist"});
        }
        
    }
    
    otpResend = async (req, res) => {
        const token = req.body.token;
        let user = await User.findOne({ email_activation_token: token });

        if(user){
            user.email_activation_otp = Math.floor(100000 + Math.random() * 900000);
            user.email_activation_timestamp = Date.now() + 900000;
            user.save();
            await Mailer(user.email, "Email verification by Maps Of The Past", emailTemplates.vendorOTPverification(user.username, user.email_activation_otp));
            res.status(201).json({ success: true, user: {username: user.username, email: user.email}, message: "OTP send successfully!" });
        }
        else{
            res.status(401).json({ success: false, message: "User doesn't exist!" });
        }
    }

    resetPassword = async (req, res) => {
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        const token = crypto.randomBytes(32).toString("hex");
        try{
            await validateResetPasswordData(req.body);
        }
        catch(error){
            throw {success: false, message: error.message, status: 403};
        }
        if(!user){
            res.status(401).json({ success: false, message: "User not found!" });
        }
        else if(user && !user.status){
            res.status(423).json({ success: false, message: "Can't logging you in, please connect with the admin" });
        }
        else if (user) {
            user.password_reset_timestamp = Date.now() + 3600000;
            user.password_reset_token = token;
            user.save();
            const result = await Mailer(email, "Reset your password", emailTemplates.resetPassword(token));
            if (result) {
                res.status(200).send({ success: "An email send to your email for the reset password !", token: token });
            }
        } else {
            res.status(403).send({ success: false, message: 'No user found using this email' });
        }
    }

    changePassword = async (req, res) => {
        const token = req.body.token;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;
        try{
            await validateChangePasswordData(req.body);
        }
        catch(error){
            throw {success: false, message: error.message, status: 403};
        }
        
        if(!token){
            res.status(423).json({ success: false, message: "Password change token is missing or invalid token" });
        }
        else if (confirm_password == password) {
            const user = await User.findOne({ password_reset_token: token });

            const current_date = Date.now();
            if (user) {
                if (user.password_reset_timestamp > current_date) {
                    const new_password = await bcrypt.hash(password, 12);
                    user.password = new_password;
                    user.password_reset_token = undefined;
                    user.password_reset_timestamp = undefined;
                    user.save();
                    res.status(201).send({ success: "Password reset successfully" });
                }
            } else {
                res.status(401).send({ success: false, message: "Reset password token is expired !" });
            }
        } else {
            res.status(403).send({ success: false, message: "confirm password and password should be same!" });
        }
    }

    getAllUsers = async (req, res) => {
        if (req.user_details?.role === "admin") {
            try {
                const users = await User.find({ "role": "vendor" });
                if (users) {
                    res.send({ "success": true, users });
                }
            }
            catch (err) {
                res.status(500).send({ success: false, message: "Something went wrong" });
            }
        }   
        else {
            res.status(403).send({ success: false, message: "Access denied" });
        }
    }

    refreshUserToken = (req, res, next) => {
        const { user_details } = req;
        const { user_id, email, role } = user_details;
        if (user_details.exp > user_details.iat) {
            let token;
            try {
                token = jwt.sign(
                    { user_id, email, role },
                    process.env.TOP_LEVEL_SECRET_KEY,
                    { expiresIn: process.env.TOKEN_EXPIRES_IN }
                );
            }
            catch (err) {
                console.log(err);
            }
            res.status(201).send({
                success: true,
                refresh_token: token,
                message: "Refreshed token generated!"
            });
        }
        else {
            res.send(401).send({
                success: false,
                message: "Token expired!"
            });
        }
    }

    getUserInformation = async (req, res) => {
        const { user_details, query } = req;
        const { user_id, role } = user_details;

        // res.status(200).send({success: true});

        if (role === "admin") {
            const orders = await Order.find({project_name: query.project});

            const fulfillOrders = orders.filter((order) => { return order.order_status === "fulfilled" });
            const unfulfillOrders = orders.filter((order) => { return order.order_status === "unfulfilled" });
            const partiallyFulfillOrders = orders.filter((order) => { return order.order_status === "partially_fulfill" });
            
            const {salesOrdersByMonth, totalOrdersByMonth} = PrepareOrderAnalyticsData(orders);
            
            res.status(200).send({
                success: true,
                ordersByMonth: {orders: totalOrdersByMonth, sales: salesOrdersByMonth},
                info: [
                {
                    name: "Orders",
                    count: orders.length,
                    fulfilled: fulfillOrders.length,
                    unfulfilled: unfulfillOrders.length,
                    partially_fulfilled: partiallyFulfillOrders.length
                }],
                message: "User Information fetched!"
            });
        }
    }

    getMerchant = async (req, userObj) => {
        let merchant = await User.findOne(userObj);
        // console.log(await redisClient.get("merchantData"), "redis merchant");
        return merchant;
    }
}

module.exports = new UserController();