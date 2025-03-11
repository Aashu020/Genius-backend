const mongoose = require('mongoose');

const datesheetModel = new mongoose.Schema({
    Exam: {
        type: String,
        required: true
    },
    Date:{
        type: String,
        required: true
    },
    Class:{
        type: String,
        required: true
    },
    Subject:{
        type: String,
        required: true
    },
    TypeOfExam:{
        type: String,
        required: true
    }
});

const Datesheet = mongoose.model("Datesheet", datesheetModel);
module.exports = Datesheet;