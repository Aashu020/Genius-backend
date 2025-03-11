const mongoose = require('mongoose');

const addBankModel = new mongoose.Schema({
    BankName: {
        type: String,
        required: true
    },
    HolderName: {
        type: String,
        required: true
    },
    AccountNo: {
        type: String,
        required: true
    },
    IFSCCode: {
        type: String,
        required: true
    },
    BranchName :{
        type: String,
        default: true
    },
    Remark: {
        type: String,
    }
});

const AddBank = mongoose.model("Bank", addBankModel);
module.exports = AddBank;