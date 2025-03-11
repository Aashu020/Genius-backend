const mongoose = require("mongoose");

const resultModel = new mongoose.Schema({
    ResultId:{
        type:String,
        required:true,
        unique:true
    },
    StudentId: {
        type: String,
        required: true
    },
    StudentName: {
        type: String,
        required: true
    },
    RollNo: {
        type: String
    },
    ClassId: {
        type: String,
        required: true
    },
    ClassName: {
        type: String,
        required: true
    },
    Section: {
        type: String
    },
    ExamId: {
        type: String,
        required: true
    },
    ExamName: {
        type: String
    },
    Subjects: [{
        SubjectName: {
            type: String,
            required: true
        },
        MinMarks: {
            type: Number
        },
        MaxMarks: {
            type: Number
        },
        ObtainedMarks: {
            type: Number
        },
        Practical: {
            type: Number
        },
        TotalMarks: {
            type: Number
        },
        Grade:{
            type: String
        }
    }],
    Result: {
        type: Number,
        required: true
    }
});

const Result = mongoose.model("Result", resultModel);
module.exports = Result; 