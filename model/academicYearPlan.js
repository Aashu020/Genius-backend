const mongoose = require("mongoose");

const academicYearPlanModel = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Remarks:{
        type:String,
        required:true
    },
    StartDate:{
        type:String,
        required:true
    },
    EndDate:{
        type:String,
        required:true
    },
    Color:{
        type:String,
        required:true
    }
});

const AcademicYearPlan = mongoose.model("AcademicYearPlan", academicYearPlanModel);
module.exports = AcademicYearPlan; 