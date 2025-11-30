const {User} = require("../models/User");
const UserController = require("./UserController");
const { validateSettingsData } = require("../validator/schema");
const shopifyProductActions = require("../components/shopifyProductActions");
const ShopifyConfig = require("../config/shopify");

class SettingsController{
    getSettings = async (req, res) => {
        const {user_details, query} = req;
        const merchant = await UserController.getMerchant(req, {user_id: user_details.user_id});
        let shopDetails;

        if(query.project === "wildarts"){
            shopDetails = merchant.shop_details_wildarts;
        }
        else{
            shopDetails = merchant.shop_details;
        }
        
        res.status(200).send({success: true, message: "Shop details fetched!", shop_details: shopDetails});
    }

    getEmailTemplate = async (req, res) => {
        const {user_details, query} = req;
        const merchant = await UserController.getMerchant(req, {user_id: user_details.user_id});
        let email_template;

        if(query.project === "wildarts"){
            email_template = merchant.email_template_details_wildarts;
        }
        else{
            email_template= merchant.email_template_details;
        }
        
        res.status(200).send({success: true, message: "Email template fetched!", email_template_details: email_template});
    }

    updateSettings = async (req, res) => {
        const data = req.body;
        const {user_details, query} = req;
        const merchant = await User.findOne({user_id: user_details.user_id}); //use only if you need to update the merchant

        try{
            await validateSettingsData(req.body);
        }
        catch(error){
            throw {success: false, message: error.message, status: 403};
        }

        if(merchant){
            let shop_name, shopify_api_key, shopify_secret_key, shopify_access_token;

            if(query.project === "wildarts"){
                merchant.shop_details_wildarts = [data];
                merchant.save();

                shop_name = merchant.shop_details_wildarts[0].shop_name;
                shopify_api_key = merchant.shop_details_wildarts[0].shopify_api_key; 
                shopify_secret_key = merchant.shop_details_wildarts[0].shopify_secret_key;
                shopify_access_token = merchant.shop_details_wildarts[0].shopify_access_token;
                
            }
            else{
                merchant.shop_details = [data];
                merchant.save();

                shop_name = merchant.shop_details[0].shop_name;
                shopify_api_key = merchant.shop_details[0].shopify_api_key; 
                shopify_secret_key = merchant.shop_details[0].shopify_secret_key;
                shopify_access_token = merchant.shop_details[0].shopify_access_token;
            }
            
            const shopify = new ShopifyConfig(shop_name, shopify_api_key, shopify_secret_key, shopify_access_token).getShopifyObject();
            try{
                let shopData = await shopify.shop.get();
                if(shopData.id){
                    let getPublications = await shopifyProductActions.getPublications(shopify, "admin");
                    if(query.project === "wildarts"){
                        merchant.shop_details_wildarts = [{...merchant.shop_details_wildarts[0], publications: getPublications}];
                        merchant.save();
                    }
                    else{
                        merchant.shop_details = [{...merchant.shop_details[0], publications: getPublications}];
                        merchant.save();
                    }
                    
                    res.status(201).send({success: true, message: "Settings updated!"});
                }
            }
            catch(err){
                res.status(401).send({success: false, message: "Details incorrect!"});
            }
        }
        else{
            res.status(500).send({message: "Something went wrong!"})
        }
    }

    updateEmailTemplate = async (req, res) => {
        const data = req.body;
        const {user_details, query} = req;
        const merchant = await User.findOne({user_id: user_details.user_id}); //use only if you need to update the merchant

        if(merchant){
            if(query.project === "wildarts"){
                merchant.email_template_details_wildarts = data;
                merchant.save();
            }
            else{
                merchant.email_template_details = data;
                merchant.save();
            }
            
            res.status(201).send({success: true, merchant, message: "Successfully updated!"});
        }
        else{
            res.status(500).send({message: "Something went wrong!"});
        }
    }
}

module.exports = new SettingsController();