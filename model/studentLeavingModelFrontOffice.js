const mongoose = require("mongoose");

const studentLeavingModelFrontOffice = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Time:{
        type:String,
        required:true
    },
    Class:{
        type:String,
        required:true
    },
    Section:{
        type:String
    },
    Purpose:{
        type:String,
        required:true
    },
    LeavingWith:{
        type:String,
        required:true
    },
    Relation:{
        type:String
    },
    verifIedVisitorId:{
        type:String
    },
    TimeOfLeaving:{
        type:String
    },
    ApprovedBy:{
        type:String
    }

});
const StudentLeaving = mongoose.model("StudentLeaving", studentLeavingModelFrontOffice);
module.exports = StudentLeaving;