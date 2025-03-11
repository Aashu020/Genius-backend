const mongoose = require('mongoose');

const payrollDataModel = new mongoose.Schema({
    PayrollID: {
        type: String,
        required: true,
        unique: true
    },
    EmployeeId: {
        type: String,
        required: true
    },
    EmployeeName:{
        type:String
    },
    Payments: [{
        Month: {
            type: String,
        },
        SlipId:{
            type:String
        },
        Salary: {
            Absent: {
                type: Number
            },
            Leave: {
                type: Number
            },
            Half: {
                type: Number
            },
            Late: {
                type: Number
            },
            Present:{
                type:Number
            },
            BaseSalary: {
                type: Number
            },
            PerDaySalary: {
                type: Number
            }
        },
        Allowance: [{
            Title: {
                type: String
            },
            Amount: {
                type: Number
            }
        }],
        Deductions: [{
            Title: {
                type: String
            },
            Amount: {
                type: Number
            }
        }],
        TotalSalary: {
            type: Number
        },
        Date: {
            type: String
        },
        Remark: {
            type: String
        }
    }]
});

const PayrollData = mongoose.model("PayrollData", payrollDataModel);
module.exports = PayrollData;