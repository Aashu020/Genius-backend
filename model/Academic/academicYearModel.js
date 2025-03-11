const mongoose = require("mongoose");

const academicYearModel = new mongoose.Schema({
    Year:{
        type:String,
        required:true,
        unique:true
    },
    Status:{
        type:Boolean,
        default:false
    }
});

const AcademicYear = mongoose.model("AcademicYear", academicYearModel);
module.exports = AcademicYear;