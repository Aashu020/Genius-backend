const mongoose = require("mongoose");

const electricityFrontOfficeModel = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    MeterNo: {
        type: String,
        required: true
    },
    Reading: {
        ReadingAt7AM: {
            type: Number,
        },
        ReadingAt3PM: {
            type: Number,
        },
        ReadingAt7PM: {
            type: Number,
        },
        Total: {
            type: Number,
        }
    }
});
const ElectricityFrontOffice = mongoose.model("ElectricityFrontOffice", electricityFrontOfficeModel);
module.exports = ElectricityFrontOffice;