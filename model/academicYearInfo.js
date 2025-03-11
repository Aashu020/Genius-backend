const mongoose = require("mongoose");

const academicYearInfoModel = new mongoose.Schema({
    StartYear: {
        type: Number,
        required: true
    },
    StartMonth: {
        type: String,
        required: true
    },
    StartMonthNumber: {
        type: Number
    },
    EndYear: {
        type: Number,
        required: true
    },
    EndMonth: {
        type: String,
        required: true
    },
    EndMonthNumber: {
        type: Number
    },
    AcademicYear: {
        type: String,
        required: true,
        unique: true
    },
    Status: {
        type: String,
        required: true
    }
});

const AcademicYearInfo = mongoose.model("AcademicYearInfo", academicYearInfoModel);
module.exports = AcademicYearInfo; 