const cors = require('cors');
const bodyParser = require("body-parser");
const crypto = require('crypto');

module.exports = function (app) {
    app.use(bodyParser.json({verify: function(req, res, buf) {
        // var shopHMAC = req.get('x-shopify-hmac-sha256');
        // if(!shopHMAC) return;
        // var sharedSecret = "17afcdc92834bb362c33709b81d0a55affb3e1c4f370e7060cabc874f3d00eac";
        // var digest = crypto.createHmac('SHA256', sharedSecret).update(buf).digest('base64');
        
        // if(digest == req.get('x-shopify-hmac-sha256')){
        //     req.isWebhookVerified = true;
        // }
        // else{
        //     req.isWebhookVerified = false;
        // }
    }}));
    
    app.use(cors({ origin: true }));
}