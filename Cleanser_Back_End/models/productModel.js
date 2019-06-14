const mongoose = require('mongoose');
const config = require("../config/database");

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    value: Number
})

module.exports = mongoose.model("product", productSchema);