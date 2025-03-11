const mongoose = require('mongoose');

const revenueDataModel = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    Type:{
        type:String,
        required:true
    },
    Label: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Vendor: {
        type: String
    },
    PaymentMode: {
        type: String,
        required: true
    },
    Detail: {
        type: String
    }
});

const RevenueData = mongoose.model("RevenueData", revenueDataModel);
module.exports = RevenueData;