const mongoose = require('mongoose');

const teachingProgressModel = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    AcademicYear:{
        type: String
    },
    Class: {
        type: String
    },
    Section:{
        type:String
    },
    Progress:[{
        Subject:{
            type:String
        },
        Percentage:{
            type:Number
        }
    }]


});

const TeachingProgress = mongoose.model("TeachingProgress", teachingProgressModel);
module.exports = TeachingProgress;