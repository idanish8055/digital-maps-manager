const ShopifyConfig = require('../config/shopify');
const {User} = require('../models/User');
const UserController = require("./UserController");

const {Order, mongoose} = require('../models/Order');
const { Mailer } = require("../components/mailer");
const emailTemplates = require("../utils/email-template");
const fs = require("fs");

class OrderController{  
    getOrderLineItemFileKey = async(order, lineItemId) => {
        let response;

        if(order){
            let expireInTimestamp = new Date(order.order_expires_in).getTime();
            let currentTimestamp = new Date().getTime();

            var dateFormat = new Intl.DateTimeFormat("en-US", {
                timeZone: "America/New_York",
                dateStyle: 'full',
                  timeStyle: 'long',
              });
              
            let readbleDate = dateFormat.format(new Date(order.order_expires_in));

            // console.log(expireInTimestamp, 'expireInTimestamp', currentTimestamp, 'currentTimestamp', currentTimestamp < expireInTimestamp);
            let lineItems = order.shopify_data.line_items;
            let selectedLineItem = lineItems.filter(lineItem => lineItem.id == lineItemId);

            response = {
                id: selectedLineItem[0].id,
                filePath: selectedLineItem[0].file_path,
                map_download_count: selectedLineItem[0].map_download_count,
                download_limit: selectedLineItem[0].download_limit,
                order_number: order.shopify_order_number,
                name: selectedLineItem[0].name,
                success: true
            };

            // if(currentTimestamp < expireInTimestamp){
                
            // }
            // else{
            //     response = {
            //         success: false,
            //         code: 'order_expires',
            //         date: readbleDate,
            //         order_number: order.shopify_order_number
            //     }
            // }
        }
        else{
            response = {
                success: false,
                code: 'order_not_found'
            };
        }

        return response;
    }

    getOrderCreateWebhook = async (req, res) => {
        const payload = req.body;
        let { cancel_reason, email, tags, line_items, customer, created_at, updated_at, order_number, name, id: order_id, 
            financial_status, fulfillment_status: order_fulfillment_status, total_tax, billing_address, shipping_address, note, phone, shipping_lines, payment_terms, 
            payment_gateway_names, fulfillments } = payload;
        res.status(200).send({success: true});
    }

    getAllOrders = async (req, res) => {
        const {user_details} = req;
        const queryObj = req.query;

        const perPage = req.query.perPage || 1000;
        const page = req.query.page || 1;
        const order_id = req.query.id || null;
        const projectName = req.query.project;

        if (queryObj.perPage) delete queryObj.perPage;
        if (queryObj.page) delete queryObj.page;
        if (queryObj.project) delete queryObj.project;

        let response = [];

        if(projectName){
            queryObj.project_name = projectName;
        }
        if(order_id){
            queryObj.shopify_order_id = order_id;
            delete queryObj.id;
        }

        if(queryObj.query){
            queryObj.$text = {$search: queryObj.query};
            delete queryObj.query;
        }

        if(queryObj.number){
            queryObj.shopify_order_number = queryObj.number;
            delete queryObj.number;
        }

        if(queryObj.email){
            queryObj['shopify_data.email'] = queryObj.email;
            delete queryObj.email;
        }

        console.log(projectName, queryObj);

        const fetchDataFromDb = Promise.all([
            Order.find(user_details.role === "admin" ? {user_id: user_details.user_id, project_name: projectName} : {}), 
            Order.find(queryObj)
            .select({
                shopify_order_number: 1, 
                shopify_order_id: 1, 
                order_status: 1, 
                shopify_data: 1, 
                _id: 1, 
                email_status: 1,
                order_expires_in:1,
                created_at:1, 
                updated_at:1, 
                user_id: 1,
                project_name: 1
            })
            .sort({shopify_order_number: -1})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec()
        ]);

        const [ordersByUser, orders] = await fetchDataFromDb;

        for (let i = 0; i < orders.length; i++) {
            let lineItems = orders[i].shopify_data.line_items;
            let subTotal = 0;
            lineItems.forEach((lineItem) => {
                subTotal = subTotal + (+lineItem.price)
            });
            orders[i].shopify_data.order_status = orders[i].order_status;
            orders[i].shopify_data.sub_total = !isNaN(subTotal) && '$'+subTotal.toFixed(2);
            orders[i].shopify_data.order_expires_in = orders[i].order_expires_in;
            orders[i].shopify_data.project_name = orders[i].project_name;

            response.push(orders[i].shopify_data);
        }

        res.status(200).send({success: true, orders: response, count: ordersByUser.length, pageCount: response.length, message: "Orders fetched successfully!"});
    }

    getOrder = async (req, res) => {
        const id = req.params.id;
        
        if (id) {
            const { user_details } = req;
            const user_id = user_details.user_id;
            const order = await Order.findOne({ _id: id, user_id }).select({ shopify_data: 1, order_status: 1, shopify_order_number: 1, _id: 0 });

            if(order){
                if(user_details.role === "vendor"){
                    const lineItems = order.shopify_data.line_items;
                    order.shopify_data.line_items=[];
                    for(let lineItem of lineItems){
                        const {id, variant_id, variant_title, image, quantity, sku, product_id} = lineItem;
                        const product = await Product.findOne({shopify_product_id: product_id})
                        order.shopify_data.line_items.push({id, variant_id, variant_title, image, quantity, sku, product_id, is_exist: product ? true : false});
                    }
                    delete order.shopify_data.sub_total;
                    delete order.shopify_data.total_tax;
                }
                
                res.status(200).send({ success: true, order: order.shopify_data, message: "Order fetched!" });
            }
            else{
                res.status(200).send({ success: false, order: [], message: "Order doesn't exist" });
            }
        }
        else {
            res.status(403).send({ success: false, product: [], message: "Order Id is missing" });
        }
    }

    updateDownloadLimit = async (req, res) => {
        let {lineItem_id, limit, orderId} = req.body;

        if(lineItem_id && limit && +limit > 0){
            let order = await Order.findOne({"shopify_order_id" : orderId});
            if(order){
                let lineItems = order.shopify_data.line_items;
                
                lineItems.map((lineItem)=>{
                    if(lineItem.id === lineItem_id){
                        lineItem.download_limit = lineItem.download_limit + (+limit);
                    }
                    return lineItem;
                });

                let shopifyData = {line_items: lineItems, ...order.shopify_data};
                let updatedOrder = await Order.updateMany({shopify_order_id: orderId}, {$set: {shopify_data: shopifyData}});

                res.status(200).send({
                    success: true, 
                    message: "Limit renewed!", 
                    object: {shopify_data: shopifyData}
                });
            }
            else{
                res.status(500).send({success: false, message: "Something went wrong!"});
            }
            
        }
        else{
            res.status(500).send({success: false, message: "Something went wrong!"});
        }
    }

    deleteOrderFromDB = async (req, res) => {
        let orderID = +req.body[0].id;

        let order = await Order.findOne({shopify_order_id: orderID});
        console.log(req.body, "BODY", order.id);

        if(order.id){
            let deleteOrderResponse = await Order.deleteOne({ shopify_order_id: orderID});
            if(deleteOrderResponse){
                res.status(201).send({success: true, message: "Email sent successfully!"});
            }
        }
        else{
            res.status(204).send({success: false, message: "Order not found!"});
        }
    }

    resendEmailToCustomer = async(req, res) => {
        let orderID = +req.body[0].id;
        let order = await Order.findOne({shopify_order_id: orderID});
        let merhant = await UserController.getMerchant();
        let projectName = req.query.project;

        if(order.id && order.shopify_data.customer.email){
            let mailerResponse = await Mailer(order.shopify_data.customer.email, 
                projectName === "maps" ? merhant.email_template_details.subject : merhant.email_template_details_wildarts.subject, 
                emailTemplates.digitalOrderConfirmation(order.order_expires_in, 
                    order.shopify_data.line_items, 
                    order.shopify_data.id, 
                    order.shopify_data.order_number, 
                    projectName === "maps" ? merhant.email_template_details.message : merhant.email_template_details_wildarts.message, 
                    projectName === "maps" ? merhant.email_template_details.important_note : merhant.email_template_details_wildarts.important_note, 
                    projectName)
                );
            console.log(mailerResponse, "mail respsne");
            if(mailerResponse){
                order.email_status = true;
                order.save();
                let merchantEmailForwardRes = await Mailer("digitaldownload@mapsofthepast.com", `Digital Order ${order.shopify_data.order_number}`, emailTemplates.merchantOrderConfirmation(order.shopify_data.order_number));
                console.log("merchantEmailForwardRes", merchantEmailForwardRes);
                res.status(201).send({success: true, message: "Email sent successfully!"});
            }
        }
        else{
            res.status(204).send({success: false, message: "Email or order not found!"});
        }
    }

    createFileandUpdateDB = async(req, res) => {
        let order = await Order.findOne({_id: "65bb9a3a1b2ea2ad99b7bc0d"});
        if(order){
            await Mailer("mohddanish@cedcommerce.com", "Your Digital Map Files are Ready for Download!", emailTemplates.digitalOrderConfirmation(order.order_expires_in, order.shopify_data.line_items, order.shopify_data.id, order.shopify_data.order_number));
        }

        res.status(200).send({message: "Email sent", order});
    }
}

module.exports = new OrderController();