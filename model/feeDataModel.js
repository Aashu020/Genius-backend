const mongoose = require('mongoose');

const feeDataModel = new mongoose.Schema({
    FeeID: {
        type: String,
        required: true,
        unique: true
    },
    StudentId: {
        type: String,
        required: true
    },
    Payments: [{
        Date: {
            type: String
        },
        ReceiptId:{
            type:String
        },
        Months: [String],
        Fee: [{
            Name: {
                type: String
            },
            Amount: {
                type: Number
            }
        }],
        Mode: {
            type: String
        },
        PaymentMode:{
            type:String
        },
        Revenue: {
            type: Boolean
        },
        LateFee:{
            type: Number
        },
        Concession: {
            type: Number
        },
        PaidAmount:{
            type:Number
        },
        Remain:{
            type:Number
        },
        Remark: {
            type: String
        }
    }],
    RemainingFee: {
        type: Number
    },
    Balance: {
        type: Number
    },
    TotalFee: {
        type: Number
    }
});

const FeeData = mongoose.model("FeeData", feeDataModel);
module.exports = FeeData;