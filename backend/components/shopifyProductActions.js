// const { mongoose, Product } = require('../models/Product');

class ShopifyProduct{
    constructor(merchant_id){
        this.merchant_id = merchant_id;
    }

    create = async (productObj, shopify, user_id, mid, role, onlineStoreSalesChannelObject) => {
        let queryObj = {};
        let productExistInDB;
        let publicationId = onlineStoreSalesChannelObject[0].node.id;
        if(mid){
            queryObj['_id'] = mid;
        }
        productExistInDB = await Product.findOne(queryObj);
        
        // if(role !== "admin"){
        //     queryObj['$text'] = {'$search': productObj.title};
        //     queryObj['$or'] = [{"shopify_data.title": productObj.title},
        //                         { "product_raw_data.title": productObj.title}];                    
        //     queryObj['user_id'] = user_id;
        //     productExistInDB = await Product.findOne(queryObj);
        // }
        
        
        const mutation = `mutation productCreate($input: ProductInput!) {
            productCreate(input: $input) {
                userErrors {
                    field
                    message
                }
                product {
                    id
                    title
                    vendor
                    productType
                    variants(first: 50) {
                        edges {
                          node {
                            id
                            title
                            displayName
                            price
                            compareAtPrice
                            inventoryQuantity
                          }
                        }
                      }
                    }
                }
            }`;

        const variables = {
            input: {
                descriptionHtml: productObj.body_html,
                title: productObj.title,
                productType: productObj.product_type,
                variants: productObj.variants,
                vendor: productObj.vendor,
                tags: productObj.tags,
                status: productObj.status,
                options: productObj.options
            }
        };
        
        if(productExistInDB && user_id === productExistInDB.user_id){
            this.update(productObj, productExistInDB.shopify_product_id, shopify);
        }
        else{
            try{
                const productResponse = await shopify.graphql(mutation, variables);
                const { productCreate } = productResponse;
                // console.log(JSON.stringify(productCreate));
                if (productCreate.product.id) {
                    const splitedProduct = productCreate.product.id.split('/');

                    const shopifyProductId = splitedProduct[splitedProduct.length - 1];
                    const updateResponse = await shopify.product.update(shopifyProductId, { images: productObj.images }); // Update only image in the product
                    let publishResponse = await this.publishedProductOnlineStore(publicationId, productCreate.product.id, shopify);
                    productExistInDB.status = true;
                    productExistInDB.shopify_product_id = updateResponse.id;
                    productExistInDB.shopify_data = updateResponse;
                    productExistInDB.product_raw_data = undefined;
                    productExistInDB.save();
                    return updateResponse;
                }
            }
            catch(e){
                throw new Error(e.message);
            }
        }
            
    }

    update = async (productObj, productId, shopify) => {
        const updateMutation = `mutation productUpdate($input: ProductInput!) {
            productUpdate(input: $input) {
                userErrors {
                    field
                    message
                }
                product {
                    id
                    title
                    vendor
                    productType
                    variants(first: 50) {
                        edges {
                          node {
                            id
                            title
                            displayName
                            price
                            compareAtPrice
                            inventoryQuantity
                          }
                        }
                    }
                }
            }
        }`;

        const variables = {
            input: {
                descriptionHtml: productObj.body_html,
                title: productObj.title,
                productType: productObj.product_type,
                variants: productObj.variants,
                vendor: productObj.vendor,
                tags: productObj.tags,
                status: productObj.status,
                images: productObj.images
            }
        };

        variables.input.id = `gid://shopify/Product/${productId}`;

        let response = await shopify.graphql(updateMutation, variables);
        // console.log(JSON.stringify(response));
        return response;
    }

    delete = async (productId, shopify) => {
        const deleteMutation = `mutation productDelete($input: ProductDeleteInput!) {
            productDelete(input: $input) {
              deletedProductId
              userErrors {
                field
                message
              }
            }
        }`;
        const deleteProductId = `gid://shopify/Product/${productId}`;
        const variables = {
            input: {
              id: deleteProductId
            }
        };

        try{
            const response = await shopify.graphql(deleteMutation, variables);
            return response;
        }
        catch(e){
            throw new Error(e.message);
        }
    }

    updateInventory = async (inventoryData, shopify) => {
        const updateInventoryMutation = `mutation ActivateInventoryItem($inventoryItemId: ID!, $locationId: ID!, $available: Int) {
            inventoryActivate(inventoryItemId: $inventoryItemId, locationId: $locationId, available: $available) {
              inventoryLevel {
                id
                available
                item {
                  id
                }
                location {
                  id
                }
              }
            }
        }`;

        const inventoryItemId = `gid://shopify/InventoryItem/${inventoryData.inventory_item_id}`;
        const locationId = `gid://shopify/Location/${inventoryData.location_id}`;
        const available = isNaN(+inventoryData.available) ? 0 : +inventoryData.available;
        const response = await shopify.graphql(updateInventoryMutation, {
          inventoryItemId,
          locationId,
          available
        });
        // console.log(JSON.stringify(response), "response");
        return response;
    }

    getPublications = async (shopify, role) => {
        let query = `query publications {
            publications(first: 5) {
                edges {
                node {
                    id
                    name
                    supportsFuturePublishing
                    app {
                        id
                        title
                        description
                        developerName
                    }
                }
                }
            }
        }`;

        if(role === "admin"){
            const response = await shopify.graphql(query);
            return response.publications.edges;
        }
        else{
            return null;
        }
    }

    publishedProductOnlineStore = async(publicationId, productId, shopify) => {
        let publishablePublishMutation = `mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
            publishablePublish(id: $id, input: $input) {
              publishable {
                availablePublicationCount
                publicationCount
              }
              shop {
                publicationCount
              }
              userErrors {
                field
                message
              }
            }
        }`;

        let variables = {
            id: productId,
            input: {
                publicationId: publicationId
            }
        };

        let response = await shopify.graphql(publishablePublishMutation, variables);
        return response;
    }
}

module.exports = new ShopifyProduct();