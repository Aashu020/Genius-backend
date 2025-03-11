const mongoose = require("mongoose");

const staffAttendanceModel = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    Attendance: [{
        EmployeeId: {
            type: String,
            required: true
        },
        EmployeeName:{
            type:String
        },
        Role:{
            type:String
        },
        Status: {
            type: String,
            required: true
        },
        InTime: {
            type: String
        },
        OutTime: {
            type: String
        }
    }]
});

const StaffAttendance = mongoose.model("StaffAttendance", staffAttendanceModel);
module.exports = StaffAttendance;