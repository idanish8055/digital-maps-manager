const Shopify = require('shopify-api-node');

class ShopifyConfig {
    constructor(shopName, apiKey, password, accessToken) {
        this.shopName = shopName;
        this.apiKey = apiKey;
        this.password = password;
        this.accessToken = accessToken
    }

    getShopifyObject() {
        let shopify;

        if(this.accessToken != null){
            shopify = new Shopify({
                autoLimit: { calls: 2, interval: 1000, bucketSize: 30 },
                shopName: this.shopName,
                accessToken: this.accessToken
            });
            
        }
        else{
            shopify = new Shopify({
                autoLimit: { calls: 2, interval: 1000, bucketSize: 30 },
                shopName: this.shopName,
                apiKey: this.apiKey,
                password: this.password
            });
        }
        
        return shopify;
    }
}

module.exports = ShopifyConfig;
