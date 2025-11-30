const Joi = require('joi');

module.exports.validateSignupData = (object) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        role: Joi.string().required(),
        status: Joi.boolean().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confirm_password: Joi.ref('password')
    });

    return schema.validate(object);
}


module.exports.validateLoginData = (object) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });

    return schema.validate(object);
}


module.exports.validateResetPasswordData = (object) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
    });

    return schema.validate(object);
}


module.exports.validateChangePasswordData = (object) => {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confirm_password: Joi.ref('password')
    });

    return schema.validate(object);
}

module.exports.validateSettingsData = (object) => {
    const schema = Joi.object({
        shop_name: Joi.string().required(),
        shopify_api_key: Joi.string().required(),
        shopify_secret_key: Joi.string().required(),
        shopify_access_token: Joi.string().required(),
        location_id: Joi.string().required()
    });

    return schema.validate(object);
}

module.exports.validateProductCreate = (object) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        status: Joi.string().required(),
        options: Joi.array.required(),
        variants: Joi.array().required(),
        location_id: Joi.string().required()
    });

    return schema.validate(object);
}