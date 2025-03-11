const mongoose = require("mongoose");

const addFeeHeaderModel = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    SchoolRevenue:{
        type:Boolean
    },
    FeeMode:{
        type:String,
        required:true
    },
    Description:{
        type:String
    }
});

const FeeHeader = mongoose.model('FeeHeader', addFeeHeaderModel);
module.exports = FeeHeader;