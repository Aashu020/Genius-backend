const mongoose = require("mongoose");

const academicEventsModel = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    StartDate: {
        type: String,
        required: true
    },
    EndDate: {
        type: String
    },
    Time:{
        type:String
    },
    Venue:{
        type:String
    },
    Description:{
        type:String
    },
    Status:{
        type:String
    }
});

const AcademicEvents = mongoose.model("AcademicEvents", academicEventsModel);
module.exports = AcademicEvents; 