const mongoose = require('mongoose');
const orderSchema = {
    _id: {type: 'string'},
    order_status: String,
    shopify_order_number: {type: 'number', required: true},
    shopify_order_id: { type: 'number', required: true },
    shopify_data: { type: 'Object', required: true },
    user_id: String,
    project_name: String,
    order_expires_in: Date,
    email_status: Boolean,
    created_at: Date,
    updated_at: Date
};
const schema = new mongoose.Schema(orderSchema, {versionKey: false});
schema.index({'$**': 'text'});
const Order = mongoose.model("orders", schema);

module.exports = {mongoose, Order};