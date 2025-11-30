const OrderController = require("../controllers/OrderController");
const {readFile, downloadFile} = require("../components/s3bucket");
const {Order} = require("../models/Order");
const S3 = require('aws-sdk/clients/s3');
const bucketName = process.env.AWS_BUCKET_NAME;
const bucketNameWidlArts = process.env.AWS_BUCKET_NAME_WILDARTS;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region, accessKeyId,secretAccessKey,
});

class MapFileController{
    downloadFile = async (req, res) => {
        let orderId = req.params.order_id;
        let lineItemId = req.params.id;

        let order = await Order.findOne({shopify_order_id: orderId});

        if(order){
            let shopifyLineItems = order.shopify_data.line_items;

            let lineItemData = await OrderController.getOrderLineItemFileKey(order, lineItemId);
            console.log(lineItemData, 'lineItemData');

            if(lineItemData.success && lineItemData.filePath.includes('00000001/uploads/') && lineItemData.map_download_count < lineItemData.download_limit){
                // res.attachment(lineItemData.filePath);
                // let fileStream = downloadFile(lineItemData.filePath);
                // fileStream.pipe(res);
                // console.log(fileStream, "File stream");

                const params = {
                    Bucket: bucketName,
                    Key: `${lineItemData.filePath}`,
                }
        
                let updatedLineItems = shopifyLineItems.map((shopifyLineItem)=>{
                    let {map_download_count}=shopifyLineItem;
                    if(shopifyLineItem.id === lineItemData.id){
                        shopifyLineItem.map_download_count = map_download_count+1;
                    }
                    return shopifyLineItem;
                });

                let shopifyData = {line_items: updatedLineItems, ...order.shopify_data};

                

                // Retrieve the PDF file from S3
                s3.getObject(params, async (err, data) => {
                    if (err) {
                        console.error(err)
                        return res.status(500).send('Error retrieving file from S3')
                    }

                    res.setHeader('Content-disposition', `attachment; filename=${lineItemData.filePath}`)
                    // res.setHeader('Content-type', 'application/pdf')
                    console.log(data, "DATA GET...");
                    res.send(data.Body);
                    let updatedOrder = await Order.updateMany({shopify_order_id: orderId}, {$set: {shopify_data: shopifyData}});
                })
                // order.shopify_data = shopifyData;
                // order.save();
                
                // res.send("<p>File not found. <a href='mailto:info@mapsofthepast.com?subject=Testing out mailto&body=This is only a test'>Contact us</a> for futher discussion.</p>")
                // res.status(200).send({
                //     updatedOrder
                // })
            }
            else if(lineItemData.success && lineItemData.map_download_count === lineItemData.download_limit){
                res.send(`<p>You have reached the download limit. You can downlaod the maps only 3 times by default. To get more access you can <a href='mailto:info@mapsofthepast.com?subject=Download limit exceeded for "${lineItemData.name}" in Order #${lineItemData.order_number}'>contact us.</a></p>`)
            }
            else if(!lineItemData.success && lineItemData.code === 'order_expires'){
                res.send(`<p>Your order has been expired on <b>${lineItemData.date}</b>. You can <a href='mailto:info@mapsofthepast.com?subject=Order #${lineItemData.order_number} expires'>contact us</a> for more details.</p>`);
            }
            else{
                res.send(`<p>File not found. <a href='mailto:info@mapsofthepast.com?subject=File not found for Order #${lineItemData.order_number}'>contact us</a>.</p>`)
            }
        }
        

        // res.send(200).send(response);        
    }

    downloadFileWildArts = async (req, res) => {
        let orderId = req.params.order_id;
        let lineItemId = req.params.id;

        let order = await Order.findOne({shopify_order_id: orderId});
        
        if(order){
            let shopifyLineItems = order.shopify_data.line_items;

            let lineItemData = await OrderController.getOrderLineItemFileKey(order, lineItemId);
            console.log(lineItemData, 'lineItemData');

            if(lineItemData.success && lineItemData.filePath.includes('00000001/uploads/') && lineItemData.map_download_count < lineItemData.download_limit){

                const params = {
                    Bucket: bucketNameWidlArts,
                    Key: `${lineItemData.filePath}`,
                }
        
                let updatedLineItems = shopifyLineItems.map((shopifyLineItem)=>{
                    let {map_download_count}=shopifyLineItem;
                    if(shopifyLineItem.id === lineItemData.id){
                        shopifyLineItem.map_download_count = map_download_count+1;
                    }
                    return shopifyLineItem;
                });

                let shopifyData = {line_items: updatedLineItems, ...order.shopify_data};

                // Retrieve the PDF file from S3
                s3.getObject(params, async (err, data) => {
                    if (err) {
                        console.error(err)
                        return res.status(500).send('Error retrieving file from S3')
                    }

                    res.setHeader('Content-disposition', `attachment; filename=${lineItemData.filePath}`)
                    // res.setHeader('Content-type', 'application/pdf')
                    // console.log(data, "DATA GET...");
                    res.send(data.Body);
                    let updatedOrder = await Order.updateMany({shopify_order_id: orderId}, {$set: {shopify_data: shopifyData}});
                })
                // order.shopify_data = shopifyData;
                // order.save();
                
                // res.send("<p>File not found. <a href='mailto:info@mapsofthepast.com?subject=Testing out mailto&body=This is only a test'>Contact us</a> for futher discussion.</p>")
                // res.status(200).send({
                //     updatedOrder
                // })
            }
            else if(lineItemData.success && lineItemData.map_download_count === lineItemData.download_limit){
                res.send(`<p>You have reached the download limit. You can downlaod the arts only 3 times by default. To get more access you can <a href='mailto:info@mapsofthepast.com?subject=Download limit exceeded for "${lineItemData.name}" in Order #${lineItemData.order_number}'>contact us.</a></p>`)
            }
            else if(!lineItemData.success && lineItemData.code === 'order_expires'){
                res.send(`<p>Your order has been expired on <b>${lineItemData.date}</b>. You can <a href='mailto:info@mapsofthepast.com?subject=Order #${lineItemData.order_number} expires'>contact us</a> for more details.</p>`);
            }
            else{
                res.send(`<p>File not found. <a href='mailto:info@mapsofthepast.com?subject=File not found for Order #${lineItemData.order_number}'>contact us</a>.</p>`)
            }
        }
        

        // res.send(200).send(response);        
    }
}

module.exports = new MapFileController();