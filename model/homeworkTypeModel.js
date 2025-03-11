const mongoose = require("mongoose");

const homeworkTypeModel = new mongoose.Schema({
    HomeworkTypeTitle: {
        type: String,
        required: true
    }
});

const HomeworkType = mongoose.model("HomeworkType", homeworkTypeModel);
module.exports = HomeworkType;