const mongoose = require("mongoose");

const paySlipModel = new mongoose.Schema({
    SlipId: {
        type: String,
        required: true,
        unique:true
    },
    EmployeeId: {
        type: String,
        required: true
    },
    Month: {
        type: String
    },
    EmployeeName: {
        type: String
    },
    Amount: {
        type: Number
    },
    Date: {
        type: String
    }
});

const PaySlip = mongoose.model("PaySlip", paySlipModel);
module.exports = PaySlip; 