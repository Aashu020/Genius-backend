const mongoose = require("mongoose");

const houseModel = new mongoose.Schema({
    HouseName: {
        type: String,
        required: true
    },
    Color: {
        type: String,
        required: true
    }
});

const House = mongoose.model("House", houseModel);
module.exports = House;