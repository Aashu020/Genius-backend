const mongoose = require("mongoose");

const feeReceiptModel = new mongoose.Schema({
    ReceiptId: {
        type: String,
        required: true,
        unique:true
    },
    StudentId: {
        type: String,
        required: true
    },
    Months: [String],
    StudentName: {
        type: String
    },
    Class: {
        type: String
    },
    Section:{
        type:String
    },
    Amount: {
        type: Number
    },
    PendingFee:{
        type:Number
    },
    Mode: {
        type: String
    },
    PaymentMode:{
        type:String
    },
    Date: {
        type: String
    }
});

const FeeReceipt = mongoose.model("FeeReceipt", feeReceiptModel);
module.exports = FeeReceipt; 