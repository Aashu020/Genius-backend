const mongoose = require("mongoose");

const addSubjectModel = new mongoose.Schema({
    Subject:{
        type:String,
        required:true,
        unique:true
    },
});

const Subject = mongoose.model("Subject", addSubjectModel);
module.exports = Subject;