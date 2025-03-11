const mongoose = require('mongoose');

const addExpenseHeaderModel = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Type:{
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
});

const ExpenseHeader = mongoose.model("ExpenseHeader", addExpenseHeaderModel);
module.exports = ExpenseHeader;