const mongoose = require("mongoose");

const visitorFrontOfficeModel = new mongoose.Schema({
    Category:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    InTime:{
        type:String,
        required:true
    },
    OutTime:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    TotalVisitorNo:{
        type:Number
    },
    Purpose:{
        type:String,
        required:true
    },
    MobileNo:{
        type:String,
        required:true
    },
    OTP:{
        type:String
    },
    verifIedVisitorId:{
        type:String
    }

});
const VisitorFrontOffice = mongoose.model("VisitorFrontOffice", visitorFrontOfficeModel);
module.exports = VisitorFrontOffice;