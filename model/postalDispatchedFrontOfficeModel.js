const mongoose = require("mongoose");

const postalDispatchedFrontOfficeModel = new mongoose.Schema({
    Category:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Item:{
        type:String,
        required:true
    },
    UnitNo:{
        type:Number,
        required:true
    },
    ReferenceNo:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    FromWhom:{
        type:String,
        required:true
    },
    Remark:{
        type:String
    }
});
const PostalDispatchedFrontOffice = mongoose.model("PostalDispatchedFrontOffice", postalDispatchedFrontOfficeModel);
module.exports = PostalDispatchedFrontOffice;