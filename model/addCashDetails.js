const mongoose = require('mongoose');

const addCashDetails = new mongoose.Schema({
    Type: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    ByWhom: {
        type: String,
        required: true
    },
    Bank: {
        type: String,
        required: true
    },
    Remark: {
        type: String,
        required: true
    }
});

const AddCashDetails = mongoose.model("CashDetails", addCashDetails);
module.exports = AddCashDetails;