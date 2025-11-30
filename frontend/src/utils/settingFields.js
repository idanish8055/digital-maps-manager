const settingFields = [
    {
        labelText: "Shop Name",
        labelFor: "shop_name",
        id: "shop_name",
        name: "shop_name",
        type: "text",
        isRequired: true,
        placeholder: "Shop Name"
    },
    {
        labelText: "Api Key",
        labelFor: "api_key",
        id: "api_key",
        name: "shopify_api_key",
        type: "text",
        isRequired: true,
        placeholder: "Api Key"
    },
    {
        labelText: "Api Secret",
        labelFor: "secret_key",
        id: "secret_key",
        name: "shopify_secret_key",
        type: "text",
        isRequired: true,
        placeholder: "Api Secret"
    },
    {
        labelText: "Access token",
        labelFor: "access_token",
        id: "access_token",
        name: "shopify_access_token",
        type: "text",
        isRequired: false,
        placeholder: "Access token(Optional)"
    },
    {
        labelText: "Location Id",
        labelFor: "location_id",
        id: "location_id",
        name: "location_id",
        type: "text",
        isRequired: true
    }
]


export { settingFields }    