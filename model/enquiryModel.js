const mongoose = require("mongoose");

const enquiryModel = new mongoose.Schema({
    RegistrationNo:{
        type:String,
        required:true,
        unique:true,
    },
    StudentName:{
        type:String,
        required:true
    },
    DOB:{
        type:String
    },
    Gender:{
        type:String,
        required:true,
    },
    MobileNo:{
        type:String,
        required:true,
    },
    AdmissionClass:{
        type:String,
        required:true
    },
    AdmissionInClass:{
        type:String
    },
    FatherName:{
        type:String,
        required:true
    },
    MotherName:{
        type:String
    },
    Address:{
        type:String
    },
    Message:{
        type:String
    },
    Refer:{
        type:String
    },
    Requirement:{
        type:String
    },
    Status:{
        type:String,
        default:"Open",
        enum:["Open","Follow up","Hot"],
        required:true
    }
});

const Enquiry = mongoose.model("Enquiry", enquiryModel);
module.exports = Enquiry;