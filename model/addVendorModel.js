const mongoose = require('mongoose');

const addVendorModel = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    MobileNo: {
        type: String,
        required: true
    },
    GSTNo: {
        type: String
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Remark: {
        type: String,
        required: true
    }
});

const Vendor = mongoose.model("Vendor", addVendorModel);
module.exports = Vendor;