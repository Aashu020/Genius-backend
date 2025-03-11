const mongoose = require("mongoose");

const timeTableModel = new mongoose.Schema({
    ClassID: {
        type: String,
        required: true,
        unique: true
    },
    Class: {
        type: String,
        required: true
    },
    Section: {
        type: String,
        required: true
    },
    Days: [{
        Day: {
            type: String,
            required: true
        },
        Lectures: [{
            Period: {
                type: String
            },
            Subject: {
                type: String
            },
            TeacherId: {
                type: String
            },
            TeacherName: {
                type: String
            },
        }]
    }]
})

const TimeTable = mongoose.model("TimeTable", timeTableModel);
module.exports = TimeTable;
