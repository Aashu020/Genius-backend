const mongoose = require("mongoose");

const periodModel = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    StartTime:{
        type:String,
        required:true
    },
    EndTime:{
        type:String,
        required:true
    }
});

const Period = mongoose.model('Period', periodModel);
module.exports = Period;