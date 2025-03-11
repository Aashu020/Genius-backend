const mongoose = require("mongoose");

const resultModel = new mongoose.Schema({
    resultId:{
        type: String,
        required: true,
        unique:true
    }
});

const Result = mongoose.model('Result', resultModel);
module.exports = Result;