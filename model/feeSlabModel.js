const mongoose = require("mongoose");

const feeSlabModel = new mongoose.Schema({
    Class:{
        type:String,
        required:true
    },
    ClassId:{
        type:String,
        required:true,
        unique:true
    },
    Fees:[{
        Name:{
            type:String
        },
        Times:{
            type:Number
        },
        Amount:{
            type:Number
        }
    }],
    TotalFee:{
        type:Number
    }
});

const FeeSlab = mongoose.model('FeeSlab', feeSlabModel);
module.exports = FeeSlab;