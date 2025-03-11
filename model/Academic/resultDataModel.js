const mongoose = require('mongoose');

const resultDataModel = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Count: {
        type: Number,
        required: true
    }
});

const ResultData = mongoose.model("ResultData", resultDataModel);
module.exports = ResultData;