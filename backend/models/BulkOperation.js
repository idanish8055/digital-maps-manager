const mongoose = require('mongoose');
const {User} = require("./User");

const bulkOperationSchema = {
    _id: {type: 'string'},
    operation_type: {type: 'string'},
    data: [],
    processedData: [],
    user_shop_details: { type: Object },
    wildarts_shop_details: { type: Object }
};
const schema = new mongoose.Schema(bulkOperationSchema, {versionKey: false});
const BulkOperation = mongoose.model("bulkOperation", schema);

module.exports = {mongoose, BulkOperation};