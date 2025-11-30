const jwt = require("jsonwebtoken");
const {User} = require("../models/User");
const guestRoutes = require("../utils/guest-routes");

module.exports.isAuth = async (req, res, next) => {
    const url = req.path;
    const guestUrls = guestRoutes();
    if (req.path === '/' || guestUrls.some(route => url.includes(route))) {
        console.log(url);
        next();
    }
    else {
        const token = req.header("authorization")?.split(" ")[1];

        if (!token) return res.status(498).send({ success: false, message: "Invalid token" });
        
        try {
            if(token){
                const decoded = jwt.verify(token, process.env.TOP_LEVEL_SECRET_KEY);
                req.user_details = decoded;
                next();
            }
        } catch (err) {
            if (err.response) {
                res.status(err.response.status).send({ error: err.response.data });
            } else {
                res.status(401).send({ success: false, error: "Token is expired" });
            }
        }
    }
}