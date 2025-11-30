const SqsService = require("./sqs");
let sqs = new SqsService();
let {prepareOrderData} = require("../utils/prepareOrderData");
let {prepareOrderDataWildarts} = require("../utils/prepareOrderDataWildarts");
let UserController = require("../controllers/UserController");
let ShopifyConfig = require("../config/shopify");
let {Order, mongoose} = require("../models/Order");
const { Mailer } = require("./mailer");
const emailTemplates = require("../utils/email-template");
const {BulkOperation} = require("../models/BulkOperation");
const {User} = require("../models/User");

class OrderHandler{
    pollCreateOrderMessage = async () => {
        try{
            const message = await sqs.recieveMessage(`${process.env.ORDER_CREATE_QNAME}`, 1, 1);

            if (message !== undefined && message.length > 0) {
                for (let i = 0; i < message.length; i++) {
                    // const orderProcessor = new OrderProcessor(message[i]);
                    const response = await this.createOrder(message[i]);         
                    
                    if (response && response.success === true) {
                        if (message[i].ReceiptHandle) {
                            const [deleteResponse] = await Promise.all([sqs.deleteMessage(`${process.env.ORDER_CREATE_QNAME}`, message[i].ReceiptHandle)]);
                            console.log(deleteResponse, 'deleteResponse');
                        }
                    }
                }
            }
        }
        catch(err){
            console.log(err, "ERROR WHILE RECIEVING MESSAGE FROM SQS CREATE ORDER");
        }
    }

    pollUpdateOrderBulkOperation = async() => {
        try{
            let rootUser = await User.findOne({role: "admin"});
            const orders = await Order.find({order_status: {$ne : "fulfilled"}});
            const ordersOperationData = orders.map(order => order.shopify_order_id);
            const operationIsExist = await BulkOperation.findOne({operation_type: "orderUpdate"}).exec();

            let operation_mid = new mongoose.Types.ObjectId();
            if(operationIsExist){
                let updatedData = ordersOperationData.filter((ordersOperation) => {
                    if(!operationIsExist.data.includes(ordersOperation)){
                        return ordersOperation;
                    }
                });
                let mergeData = [...updatedData, ...operationIsExist.data];
                operationIsExist.data = mergeData;
                operationIsExist.user_shop_details = rootUser.shop_details;
                operationIsExist.wildarts_shop_details = rootUser.shop_details_wildarts;

                operationIsExist.save();
            }
            else{
                await BulkOperation.create({
                    _id: operation_mid.toString(),
                    operation_type: "orderUpdate",
                    processedData: [],
                    data: ordersOperationData,
                    user_shop_details: rootUser.shop_details,
                    wildarts_shop_details: rootUser.shop_details_wildarts
                });
            }
            // console.log(orders.length, operationIsExist, ordersOperationData);
        }
        catch(err){
            console.log(err, "ERROR WHILE RECIEVING MESSAGE FROM SQS BULK");
        }
    }
    
    pollUpdateOrderMessage = async () => {
        try{
            let getOrderUpdateOperation = await BulkOperation.findOne({operation_type: "orderUpdate"});

            if(getOrderUpdateOperation && getOrderUpdateOperation.data.length !== 0){
                let orderId = getOrderUpdateOperation.data[0];
                let orderIsExist = await Order.findOne({shopify_order_id: orderId});

                if(orderIsExist){
                    const { shop_name, shopify_api_key, shopify_secret_key, shopify_access_token } = orderIsExist.project_name === "maps" ? getOrderUpdateOperation.user_shop_details[0] : getOrderUpdateOperation.wildarts_shop_details[0];
                    const shopify = new ShopifyConfig(shop_name, shopify_api_key, shopify_secret_key, shopify_access_token).getShopifyObject();
                    let updatedOrderData = await shopify.order.get(orderId);

                    // console.log(JSON.stringify(updatedOrderData.customer), "preparedData");

                    let preparedData;
                    if(orderIsExist.project_name === "maps"){
                        preparedData = await prepareOrderData(updatedOrderData, getOrderUpdateOperation.user_shop_details[0]);
                    }
                    else{
                        preparedData = await prepareOrderDataWildarts(updatedOrderData, getOrderUpdateOperation.wildarts_shop_details[0]);
                    }

                    if(preparedData.isDigitalOrder && preparedData.orderPreparedData){
                        let orderStatus = preparedData.orderPreparedData.line_items.map((item) => {
                            return item.fulfillment_status && item.fulfillment_status != 'null' ? true : false;
                        });
                        
                        orderStatus = orderStatus.includes(true) && orderStatus.includes(false) ? "partially_fulfill" : 
                                    (orderStatus.includes(true) && !orderStatus.includes(false) ? "fulfilled" : "unfulfill");
            
                        orderIsExist.shopify_data = preparedData.orderPreparedData;
                        orderIsExist.order_status = orderStatus;
                        orderIsExist.updated_at = Date.now();
                        orderIsExist.save();
                        let updatedData = getOrderUpdateOperation.data.filter(oid => oid !== orderId);
                        let updatedProcessedData = [...getOrderUpdateOperation.processedData, orderId];
                        getOrderUpdateOperation.processedData = updatedProcessedData;
                        getOrderUpdateOperation.data = updatedData;
                        getOrderUpdateOperation.save();
                    }
                }
            }
        }
        catch(err){
            console.log(err, "ERROR WHILE RECIEVING MESSAGE FROM SQS UPDATE");
        }
    }

    pollDeleteOrderMessage = async () => {
        try{
            const message = await sqs.recieveMessage(`${process.env.ORDER_DELETE_QNAME}`, 1, 1);

            if (message !== undefined && message.length > 0) {
                for (let i = 0; i < message.length; i++) {
                    // const orderProcessor = new OrderProcessor(message[i]);
                    const response =    await this.deleteOrder(message[i]);         
                    
                    if (response && response.success === true) {
                        if (message[i].ReceiptHandle) {
                            const [deleteResponse] = await Promise.all([sqs.deleteMessage(`${process.env.ORDER_DELETE_QNAME}`, message[i].ReceiptHandle)]);
                            console.log(deleteResponse, 'deleteResponse');
                        }
                    }
                }
            }
        }
        catch(err){
            console.log(err, "ERROR WHILE RECIEVING MESSAGE FROM SQS");
        }
    }

    createOrder = async(message) => {
        let messageData = message;
        if (messageData.Body === undefined) return null;
        let messageBody = JSON.parse(messageData.Body);
        let orderData = messageBody['data'];prepa

        let shopURL = messageBody['shop_url'];

        let merhant = await UserController.getMerchant();
        let ShopifyDetails = new ShopifyConfig(merhant.shop_details[0].shop_name, merhant.shop_details[0].shopify_api_key, merhant.shop_details[0].shopify_secret_key, merhant.shop_details[0].shopify_access_token);
        let shopify = ShopifyDetails.getShopifyObject();
        let preparedData, projectName;

        if(shopURL === "wild-arts-ric.myshopify.com"){
            preparedData = await prepareOrderDataWildarts(orderData, merhant.shop_details_wildarts[0]);
            projectName = "wildarts";
        }
        else{
            preparedData = await prepareOrderData(orderData, merhant.shop_details[0]);
            projectName = "maps";
        }
        
        if(preparedData.isDigitalOrder && preparedData.orderPreparedData){
            let orderStatus = preparedData.orderPreparedData.line_items.map((item) => {
                return item.fulfillment_status && item.fulfillment_status != 'null' ? true : false;
            });
            
            orderStatus = orderStatus.includes(true) && orderStatus.includes(false) ? "partially_fulfill" : 
                        (orderStatus.includes(true) && !orderStatus.includes(false) ? "fulfilled" : "unfulfill");
            let orderIsExist = await Order.findOne({shopify_order_id: preparedData.orderPreparedData.id});

            if(!orderIsExist){
                // let expireInTimestamp = new Date(expires_in).getTime();
                // let currentTimestamp = new Date().getTime();
                let order_mid = new mongoose.Types.ObjectId();
                let order = await Order.create({
                    _id: order_mid.toString(),
                    order_status: orderStatus,
                    shopify_order_number: preparedData.orderPreparedData.order_number,
                    shopify_order_id: preparedData.orderPreparedData.id,
                    shopify_data: preparedData.orderPreparedData,
                    user_id: merhant._id,
                    email_status: false,
                    project_name: projectName,
                    order_expires_in: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                    created_at: Date.now(),
                    updated_at: Date.now()
                });
                console.log("Saved Order In Database", order);
                try{
                    if(order._id){
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
                        if(mailerResponse){
                            order.email_status = true;
                            order.save();
                            await Mailer("digitaldownload@mapsofthepast.com", `Digital Order ${preparedData.orderPreparedData.order_number}`, emailTemplates.merchantOrderConfirmation(order.shopify_data.order_number));
                        }
                        
                    }
                }
                catch(err){
                    console.log(err, "While sending email");
                }
            }
            return {success: true, message: "Digital products"} 
        }
        else{
            return {success: true, message: "Digital products not found in this order"}
        }
    }

    updateOrder = async(message)=> {
        let messageData = message;
        if (messageData.Body === undefined) return null;
        let messageBody = JSON.parse(messageData.Body);
        let orderData = messageBody['data'];

        let merhant = await UserController.getMerchant();
        let ShopifyDetails = new ShopifyConfig(merhant.shop_details[0].shop_name, merhant.shop_details[0].shopify_api_key, merhant.shop_details[0].shopify_secret_key, merhant.shop_details[0].shopify_access_token);
        let shopify = ShopifyDetails.getShopifyObject();

        let preparedData, projectName;

        if(shopURL === "wild-arts-ric.myshopify.com"){
            preparedData = await prepareOrderDataWildarts(orderData, merhant.shop_details_wildarts[0]);
            projectName = "wildarts";
        }
        else{
            preparedData = await prepareOrderData(orderData, merhant.shop_details[0]);
            projectName = "maps";
        }

        if(preparedData.isDigitalOrder && preparedData.orderPreparedData){
            let orderStatus = preparedData.orderPreparedData.line_items.map((item) => {
                return item.fulfillment_status && item.fulfillment_status != 'null' ? true : false;
            });
            
            orderStatus = orderStatus.includes(true) && orderStatus.includes(false) ? "partially_fulfill" : 
                        (orderStatus.includes(true) && !orderStatus.includes(false) ? "fulfilled" : "unfulfill");
            let orderIsExist = await Order.findOne({shopify_order_id: preparedData.orderPreparedData.id});

            if(orderIsExist){
                orderIsExist.order_status = orderStatus;
                orderIsExist.shopify_data = preparedData.orderPreparedData;
                orderIsExist.updated_at = Date.now();
                orderIsExist.save();
                return {success: true, message: "Digital products"}
            }
            else{
                return {success: true, message: "Digital order not found!"}
            }
        }
        else{
            return {success: true, message: "Digital products not found in this order"}
        }
    }

    deleteOrder = async (message) => {
        let messageData = message;
        if (messageData.Body === undefined) return null;
        let messageBody = JSON.parse(messageData.Body);
        let orderData = messageBody['data'];

        let merhant = await UserController.getMerchant();
        let ShopifyDetails = new ShopifyConfig(merhant.shop_details[0].shop_name, merhant.shop_details[0].shopify_api_key, merhant.shop_details[0].shopify_secret_key, merhant.shop_details[0].shopify_access_token);
        let shopify = ShopifyDetails.getShopifyObject();
        console.log(orderData, 'preparedData.orderPreparedData');
        let orderIsExist = await Order.findOne({shopify_order_id: orderData.id});

        if(orderIsExist){
            let deleteOrderResponse = await Order.deleteOne({ shopify_order_id: orderData.id });
            if(deleteOrderResponse){
                return {success: true, message: "Digital order deleted!"}
            }
        }
        else{
            return {success: true, message: "Digital order not found!"}
        }
    }
}

module.exports = new OrderHandler;