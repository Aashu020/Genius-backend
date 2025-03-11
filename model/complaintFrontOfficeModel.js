const mongoose = require("mongoose");

const compliantFrontOfficeModel = new mongoose.Schema({
    CompliantNo: {
        type: String,
        required: true,
        unique: true 
    },
    Source: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    AddComplaint: {
        type: String,
        required: true
    },
    ComplaintFor: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    }
});

const CompliantFrontOffice = mongoose.model("CompliantFrontOffice", compliantFrontOfficeModel);
module.exports = CompliantFrontOffice;
