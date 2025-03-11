const mongoose = require("mongoose");

const classModel = new mongoose.Schema({
    ClassId:{
        type: String,
        required: true,
        unique:true
    },
    AcademicYear:{
        type:String,
        required:true
    },
    Class:{
        type:String,
        required:true,
        unique: true
    },
    Section:[String],
    Subjects:[{
        Subject:{
            type:String
        },
        Syllabus:[{
            Title:{
                type:String  
            },
            Topics:[String]
        }],
        Status:{
            type:String
        }
    }]
});

const Class = mongoose.model('Class', classModel);
module.exports = Class;