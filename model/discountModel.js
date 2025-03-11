const mongoose = require("mongoose");

const discountModel = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Percentage: {
        type: Number
    }
});

const Discount = mongoose.model('Discount', discountModel);
module.exports = Discount;