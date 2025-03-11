const mongoose = require("mongoose");

const studentAttendanceModel = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    Class: {
        type: String,
        required: true
    },
    Section: {
        type: String,
        required: true
    },
    Attendance: [{
        RollNo: {
            type: Number
        },
        StudentId:{
            type: String
        },
        StudentName:{
            type: String
        },
        Status: {
            type: String
        },
        InTime: {
            type: String
        },
        OutTime: {
            type: String
        }
    }]
});

const StudentAttendance = mongoose.model("StudentAttendance", studentAttendanceModel);
module.exports = StudentAttendance; 