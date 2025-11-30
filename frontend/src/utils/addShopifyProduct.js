// import axios from "axios";
// import {
//     USER_API_ENDPOINTS, PRODUCT_API_ENDPOINTS, API_HEADERS, HANDLE_API_ERROR,
//     VENDOR_DATA, ORDER_API_ENDPOINTS, SETTING_API_ENDPOINTS, VENDOR_API_ENDPOINTS, UPDATE_PRODUCT_STATUS
// } from "./config";

export const addShopifyProduct = (values, formData, description, variants) => {
    const optionArray = variants.length > 0 && variants[0]?.option1Name ? [variants[0]?.option1Name] : ['Title'];

    variants[0]?.option2Name && optionArray.push(variants[0]?.option2Name);
    variants[0]?.option3Name && optionArray.push(variants[0]?.option3Name);
    
    const productData = {
        product: {
            title: values.productName || null,
            body_html: description || null,
            vendor: values.vendorname || null,
            product_type: values.producttype || null,
            status: values.status.toUpperCase() || null,
            options: optionArray,
            tags: values.tags || "",
            variants: variants.length > 0 ?
                variants.map((variant) => {
                    let variantOptions = variant?.option1Value !== "" && variant?.option2Value !== "" && variant?.option3Value !== "" ?
                        [variant?.option1Value, variant?.option2Value, variant?.option3Value]
                        : (variant?.option1Value !== "" && variant?.option2Value !== "" ? [variant?.option1Value, variant?.option2Value] : variant?.option1Value !== "" && [variant?.option1Value]);

                    return {
                        options: variantOptions,
                        price: variant?.price || null,
                        sku: variant?.sku || null,
                        compareAtPrice: variant?.compareAtPrice ? variant?.compareAtPrice : undefined,
                        inventoryQuantities: [
                            {
                                "availableQuantity": (+variant?.quantity) ? (+variant?.quantity) : 0,
                                "locationId": "locationId"
                            }

                        ],
                        inventoryManagement: 'SHOPIFY'
                    }
                }) :
                [
                    {
                        options: 'Default Title',
                        price: values?.price,
                        sku: values?.sku && values.sku,
                        compareAtPrice: values.compareAtPrice ? values.compareAtPrice : undefined,
                        inventoryQuantities: [
                            {
                                "availableQuantity": (+values?.quantity) ? (+values?.quantity) : 0,
                                "locationId": "locationId"
                            }

                        ],
                        inventoryManagement: 'SHOPIFY'
                    }
                ]

        },
    };
    formData.append("product", JSON.stringify(productData.product));
    return formData;
};

// const addProduct = async (formData) => {
//     let requestHeaders = API_HEADERS();
//     try {
//         const response = await axios.post('https://app.rvonline.com.au/api/products/add',
//             formData,
//             requestHeaders
//         );
//         return { status: response.status, error: null, successMessage: response.data.message };
//     } catch (error) {
//         const errorMessage = HANDLE_API_ERROR(error);
//         console.log(errorMessage);
//         return { status: null, error: errorMessage, successMessage: null }
//     }
// }