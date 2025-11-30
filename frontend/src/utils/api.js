import axios from "axios";
import {
  USER_API_ENDPOINTS, PRODUCT_API_ENDPOINTS, API_HEADERS, HANDLE_API_ERROR, BULK_OPERATIONS_ENDPOINTS, 
  VENDOR_DATA, ORDER_API_ENDPOINTS, SETTING_API_ENDPOINTS, VENDOR_API_ENDPOINTS, UPDATE_PRODUCT_STATUS
} from "./config";

// Fetch  Product data
export const fetchProductData = async (queryString) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.get(
      `${PRODUCT_API_ENDPOINTS.GET_PRODUCTS}${queryString ? queryString : ""}`,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};
// Function ends here

// Fetch Shopify Product data
export const fetchShopifyProductData = async (queryString) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.get(
      `${PRODUCT_API_ENDPOINTS.GET_SHOPIFY_PRODUCTS}${queryString ? queryString : ""}`,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};
// Function ends here

// Fetch Product details
export const fetchProductDetails = async (queryString) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.get(
      `${PRODUCT_API_ENDPOINTS.GET_PRODUCT_DETAILS}${queryString ? queryString : ""}`,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};
// Function ends here


// Create New Product 
export const createProduct = async (data) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.post(
      PRODUCT_API_ENDPOINTS.CREATE_PRODUCT,
      data,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};
// Function ends here


// update updateProductPrice 
export const updateProductPrice = async (data) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  
  try {
    const response = await axios.post(
      PRODUCT_API_ENDPOINTS.UPDATE_PRICE,
      data,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};
// Function ends here

export const updateProductStatus = async (data) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.post(
      `${BULK_OPERATIONS_ENDPOINTS.UPLOAD_BULK_OPERATION}`,
      data,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: error.response.data, error: errorMessage };
  }
};

export const updateProductStatusShopify = async (data) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.put(
      `${PRODUCT_API_ENDPOINTS.PRODUCT_UPDATE_STATUS_SHOPIFY}`,
      data,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: error.response.data, error: errorMessage };
  }
};

export const getBulkOperations = async () => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.get(
      `${BULK_OPERATIONS_ENDPOINTS.GET_BULK_OPERATION}`,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};

export const deleteProducts = async (data) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  // requestHeaders.data = data;
  try {
    const response = await axios.post(
      `${BULK_OPERATIONS_ENDPOINTS.DELETE_BULK_OPERATION}`,
      data,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: error.response.data, error: errorMessage };
  }
};

export const deleteProductsByVendor = async (data) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  requestHeaders.data = data;
  try {
    const response = await axios.delete(
      `${PRODUCT_API_ENDPOINTS.DELETE_PRODUCT_VENDOR}`,
      requestHeaders
    );
    
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: error.response.data, error: errorMessage };
  }
};

// update product vendor
export const updateProductVendor = async (data) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.post(
      `${PRODUCT_API_ENDPOINTS.UPDATE_PRODUCT_VENDOR}`,
      data,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: error.response.data, error: error.response.data.message };
  }
};
// Function ends here

// Fetch  order  data
export const fetchOrderData = async (queryString) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.get(
      `${ORDER_API_ENDPOINTS.GET_ORDERS}${queryString ? queryString : ""}`,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};
// Function ends here

export const deleteOrder = async (data) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  // requestHeaders.data = data;
  try {
    const response = await axios.post(
      `${ORDER_API_ENDPOINTS.ORDER_DELETE}`,
      data,
      requestHeaders
    );
    console.log('response in api', response);
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: error.response.data, error: errorMessage };
  }
};

export const resendOrderEmail = async (data, projectName) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  // requestHeaders.data = data;
  try {
    const response = await axios.post(
      `${ORDER_API_ENDPOINTS.RESEND_EMAIL}?project=${projectName}`,
      data,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: error.response.data, error: errorMessage };
  }
};


// Fetch  order  data
export const updateOrderfulfillment = async (queryString, data) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.post(
      `${ORDER_API_ENDPOINTS.FULFILL_ORDER}${queryString ? queryString : ""}`,
      data,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};
// Function ends here


// Update store settings
export const orderTracking = async (queryString, data) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.post(
      `${ORDER_API_ENDPOINTS.ORDER_TRACKING}${queryString ? queryString : ""}`,
      data,
      requestHeaders
    );

    return { status: response.status, data: response.data, successMessage: response.data.message };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { status: null, error: errorMessage, successMessage: null }
  }
};

// Function ends here

export const updateDownloadLimit = async (data) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.put(
      `${ORDER_API_ENDPOINTS.ORDER_DOWNLOAD_LIMIT}`,
      data,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: error.response.data, error: errorMessage };
  }
};

// Get vendors' data
export const vendorData = async (queryString) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.get(
      `${VENDOR_API_ENDPOINTS.GET_VENDORS}${queryString ? "/" + queryString : ""}`,
      requestHeaders
    );
    return { data: response.data.vendors, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};
// Function ends here


// Get store settings
export const getStoreSetting = async (projectName) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.get(
      `${SETTING_API_ENDPOINTS.GET_STORE_SETTING}?project=${projectName}`,
      requestHeaders
    );
    return { data: response.data.shop_details, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};

// Get store settings
export const getStoreSettingEmailTemplate = async (projectName) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.get(
      `${SETTING_API_ENDPOINTS.GET_EMAIL_TEMPLATE}?project=${projectName}`,
      requestHeaders
    );
    return { data: response.data.email_template_details, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};

// Function ends here


// Get user information
export const getUserInfo = async (projectName) => {
  // Function starts here
  
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.get(
      `${USER_API_ENDPOINTS.USER_INFO}?project=${projectName}`,
      requestHeaders
    );
    delete response.data.success;
    delete response.data.message;
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage, code: error.code };
  }
};
// Function ends here


// Import product CSV
export const importProductCSV = async (formData) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  let data = formData;
  try {
    const response = await axios.post(
      `${PRODUCT_API_ENDPOINTS.CSV_IMPORT}`,
      data,
      requestHeaders
    );

    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};
// Function ends here

// Bulk Update Inventory

export const updateProductCSV = async (formData) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  let data = formData;
  try {
    const response = await axios.post(
      `${PRODUCT_API_ENDPOINTS.CSV_UPDATE}`,
      data,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};

// CSV export

export const exportProductCSV = async () => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.post(
      `${PRODUCT_API_ENDPOINTS.CSV_EXPORT}`,
      { responseType: 'blob' },
      requestHeaders
    );
    if (response.statusText !== "Unauthorized" && response.status === 201) {
      var binaryData = [];
      binaryData.push(response.data);
      let url = window.URL.createObjectURL(new Blob(binaryData, { type: "text/csv;charset=UTF-8" }));
      let a = document.createElement('a');
      a.href = url;
      a.download = 'vendor_products.csv';
      a.click();
    }
    return { data: response, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};
// Function ends here

export const getSampleProductCSV = async () => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.post(
      `${PRODUCT_API_ENDPOINTS.GET_CSV_SAMPLE}`,
      { responseType: 'blob' },
      requestHeaders
    );
    if (response.statusText !== "Unauthorized") {
      var binaryData = [];
      binaryData.push(response.data);
      let url = window.URL.createObjectURL(new Blob(binaryData, { type: "text/csv" }));
      let a = document.createElement('a');
      a.href = url;
      a.download = 'sample_template.csv';
      a.click();
    }
    return { data: response, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};

// Get Ssopify products
export const importShopifyProducts = async () => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.get(
      `${PRODUCT_API_ENDPOINTS.SHOPIFY_PRODUCT_IMPORT}`,
      requestHeaders
    );

    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage, code: error.code };
  }
};

// Update store settings
export const optVerifyHandler = async (data) => {
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.post(
      `${USER_API_ENDPOINTS.OTP_VERIFY}`,
      data,
      requestHeaders
    );
    return { status: response.status, error: null, successMessage: response.data.message };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { status: null, error: errorMessage, successMessage: null }
  }
};


// Update store settings
export const updateStoreSetting = async (data, projectName) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.put(
      `${SETTING_API_ENDPOINTS.UPDATE_STORE_SETTING}?project=${projectName}`,
      data,
      requestHeaders
    );
    return { status: response.status, error: null, successMessage: response.data.message };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { status: null, error: errorMessage, successMessage: null }
  }
};

export const updateEmailTemplate = async (data, projectName) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.put(
      `${SETTING_API_ENDPOINTS.UPDATE_EMAIL_TEMPLATE}?project=${[projectName]}`,
      data,
      requestHeaders
    );
    return { status: response.status, error: null, successMessage: response.data.message };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { status: null, error: errorMessage, successMessage: null }
  }
};
// Function ends here


// Update vendor info settings
export const updateVendorData = async (data, queryString) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  try {
    const response = await axios.put(
      `${VENDOR_API_ENDPOINTS.GET_VENDORS}${queryString ? "/" + queryString : ""}`,
      data,
      requestHeaders
    );
    return { status: response.status, error: null, successMessage: response.data.message };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { status: null, error: errorMessage, successMessage: null }
  }
};
// Function ends here

export const userLogout = async (data) => {
  // Function starts here
  try {
    const response = await axios.post(
      `${USER_API_ENDPOINTS.USER_LOGOUT}`,
      data
    );
    return { status: response.status, error: null, successMessage: response.data.message };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { status: null, error: errorMessage, successMessage: null }
  }
};

export const uploadInvoiceHandler = async (formData) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  let data = formData;
  let orderId = formData.get('orderId');
  let endpoint = ORDER_API_ENDPOINTS.UPLOAD_INVOICE;

  try {
    const response = await axios.post(
      `${endpoint.replace(':id', orderId)}`,
      data,
      requestHeaders
    );
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
}

// Fetch Invoice
export const downloadInvoice = async (orderId, invoiceKey) => {
  // Function starts here
  let requestHeaders = API_HEADERS();
  let endpoint = ORDER_API_ENDPOINTS.DOWNLOAD_INVOICE;
  try {
    const response = await axios.post(
      `${endpoint.replace(':id', orderId)}`,
      { key: invoiceKey },
      requestHeaders
    );

    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = HANDLE_API_ERROR(error);
    return { data: null, error: errorMessage };
  }
};