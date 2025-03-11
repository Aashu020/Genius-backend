const mongoose = require('mongoose');

const payrollHeaderModel = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Type:{
        type: String,
        required: true
    }
});

const PayrollHeader = mongoose.model("PayrollHeader", payrollHeaderModel);
module.exports = PayrollHeader;