module.exports.prepareOrderData = async (orderData, shopify_details) => {
    let digitalLineItems = []; //D-CWRA0001
    let lineItems = orderData.line_items;

    if(lineItems.length > 0){
        for(let i = 0; i < lineItems.length; i++){
            let variantTitle = lineItems[i].variant_title;
            let variantSKU = lineItems[i].sku;
            if(variantTitle === 'Digital Download' && variantSKU.includes('D-') || variantTitle.toLowerCase() === 'digital download' && variantSKU.includes('D-')){
                let metafieldsList = await fetch(`https://${shopify_details.shop_name}/admin/api/2024-01/products/${lineItems[i].product_id}/variants/${lineItems[i].variant_id}/metafields.json`,{
                    method: 'GET',
                    headers: {
                        'X-Shopify-Access-Token': shopify_details.shopify_access_token,
                        'Content-Type': 'application/json'
                    }
                });
                let metafieldResponse = await metafieldsList.json();
                let filePathMetafield = metafieldResponse.metafields.filter((metafield)=>{
                    return metafield.key === 'file_path' && metafield.value.includes('00000001/uploads/');
                });

                // console.log('Digital Download-', variantSKU);
                

                if(filePathMetafield.length > 0){
                    lineItems[i].map_download_count = 0;
                    lineItems[i].download_limit = 3;
                    lineItems[i].file_path = filePathMetafield[0].value;
                    digitalLineItems.push(lineItems[i]);
                } 
            }
        }

        if(digitalLineItems.length > 0){
            return {
                isDigitalOrder: true,
                orderPreparedData: {...orderData, line_items: digitalLineItems}
            }
        }
        else{
            return {
                isDigitalOrder: false,
            }
        }
    }
}