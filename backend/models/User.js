const { string } = require('joi');
const mongoose = require('mongoose');
const UserSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    user_id: String,
    role: String,
    merchant_id: String,
    shop_details: Array,
    shop_details_wildarts: Array,
    status: Boolean,
    email_activation_otp: Number,
    email_activation_timestamp: Date,
    email_activation_token: String,
    password_reset_token: String,
    password_reset_timestamp: Date,
    created_at: Date,
    updated_at: Date,
    email_template_details: Object,
    email_template_details_wildarts: Object
};

const userSchema = new mongoose.Schema(UserSchema, {versionKey: false});


const User = mongoose.model("users", userSchema);


module.exports = {mongoose, User};