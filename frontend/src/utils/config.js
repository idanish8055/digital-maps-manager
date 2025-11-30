const API_BASE_URL = 'https://api.mapsofthepast.com/api';

export const USER_INFO = {
  EMAIL: 'info@mapofthepast.com'
}

export const USER_API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/user/login`,
  GET_USERS: `${API_BASE_URL}/users`,
  CREATE_USER: `${API_BASE_URL}/user/signup`,
  UPDATE_USER: (id) => `${API_BASE_URL}/users/${id}`,
  RESET_PASSWORD: `${API_BASE_URL}/user/password/reset`,
  CHANGE_PASSWORD: `${API_BASE_URL}/user/password/change`,
  USER_INFO: `${API_BASE_URL}/user/info`,
  USER_LOGOUT: `${API_BASE_URL}/user/logout`,
  OTP_VERIFY: `${API_BASE_URL}/user/otp/verify`
};

export const PRODUCT_API_ENDPOINTS = {
  GET_PRODUCTS: `${API_BASE_URL}/products?`,
  GET_SHOPIFY_PRODUCTS: `${API_BASE_URL}/products?`,
  GET_PRODUCT_DETAILS: `${API_BASE_URL}/products/`,
  CSV_IMPORT: `${API_BASE_URL}/products/import/csv`,
  CSV_UPDATE: `${API_BASE_URL}/products/update/csv`,
  UPDATE_PRODUCT_STATUS: `${API_BASE_URL}/products/update/status`,
  CSV_EXPORT: `${API_BASE_URL}/products/export/csv`,
  UPDATE_PRICE: `${API_BASE_URL}/products/update/price`,
  UPDATE_PRODUCT_VENDOR: `${API_BASE_URL}/products/update/vendor`,
  SHOPIFY_PRODUCT_IMPORT: `${API_BASE_URL}/products/import/shopify`,
  DELETE_PRODUCT: `${API_BASE_URL}/products`,
  GET_CSV_SAMPLE: `${API_BASE_URL}/products/sample/csv`,
  CREATE_PRODUCT: `${API_BASE_URL}/products/add`,
  DELETE_PRODUCT_VENDOR: `${API_BASE_URL}/products/vendor`,
  PRODUCT_UPDATE_STATUS_SHOPIFY: `${API_BASE_URL}/products/update/status/shopify`
}

export const BULK_OPERATIONS_ENDPOINTS = {
  GET_BULK_OPERATION: `${API_BASE_URL}/bulk/operations`,
  DELETE_BULK_OPERATION: `${API_BASE_URL}/bulk/products/delete`,
  UPLOAD_BULK_OPERATION: `${API_BASE_URL}/bulk/products/create`
}

export const ORDER_API_ENDPOINTS = {
  GET_ORDERS: `${API_BASE_URL}/orders?`,
  FULFILL_ORDER: `${API_BASE_URL}/orders/`,
  UPLOAD_INVOICE: `${API_BASE_URL}/orders/:id/invoice/upload`,
  DOWNLOAD_INVOICE: `${API_BASE_URL}/orders/:id/invoice`,
  ORDER_TRACKING: `${API_BASE_URL}/orders/tracking/`,
  ORDER_DOWNLOAD_LIMIT: `${API_BASE_URL}/order/update/limit`,
  ORDER_DELETE: `${API_BASE_URL}/orders`,
  RESEND_EMAIL: `${API_BASE_URL}/orders/email/resend`
}

export const SETTING_API_ENDPOINTS = {
  GET_STORE_SETTING: `${API_BASE_URL}/settings/store`,
  UPDATE_STORE_SETTING: `${API_BASE_URL}/settings/store/update`,
  UPDATE_EMAIL_TEMPLATE: `${API_BASE_URL}/settings/template/update`,
  GET_EMAIL_TEMPLATE: `${API_BASE_URL}/settings/template`
}

export const VENDOR_API_ENDPOINTS = {
  GET_VENDORS: `${API_BASE_URL}/vendors`,
}



export const API_HEADERS = () => {
  let userData = localStorage.getItem('userData');
  userData = JSON.parse(userData);
  const API_AUTH_TOKEN = userData?.token;
  return {
    headers: {
      "Authorization": `Bearer ${API_AUTH_TOKEN}`
    }
  };
};





// error-handling

export const HANDLE_API_ERROR = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    switch (error.response.status) {
      case 204:
        return 'No content input';
      case 400:
        return 'Bad Request';
      case 401:
        return error.response.data.message;
      case 402:
        return 'Payment Required';
      case 403:
        return 'User not found';
      case 404:
        return 'Something went wrong';
      case 405:
        return 'Method Not Allowed';
      case 406:
        return 'Not Acceptable';
      case 408:
        return 'Request Timeout';
      case 409:
        return error.response.data.message;
      case 411:
        return 'Length Required';
      case 413:
        return 'Payload Too Large';
      case 414:
        return 'URI Too Long';
      case 415:
        return 'Unsupported Media Type';
      case 416:
        return 'Range Not Satisfiable';
      case 404:
        return error.response.data.message;
      case 422:
        return error.response.data.message;
      case 423:
        return error.response.data.message;
      case 498:
        return 'User credentials expire please login again';
      case 500:
        return 'Internal Server Error';
      case 503:
        return 'Data Fetch Problem';
      default:
        return `Unknown Error (${error.response.status})`;
    }
    // You can handle the error here and display an error message to the user
  } else if (error.request) {
    // The request was made but no response was received
    return 'Something went wrong';

  } else {
    // Something happened in setting up the request that triggered an Error
    return `API Error Message: ${error.message}`;
    // You can handle the error here and display an error message to the user
  }
};