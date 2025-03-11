const mongoose = require("mongoose");

const siblingModel = new mongoose.Schema({
    SiblingId: {
        type: String,
        required: true
    },
    ExistingStudentId: {
        type: String
    },
    ExistingStudentName: {
        type: String
    },
    Sibling: [{
        StudentId: {
            type: String
        },
        StudentName: {
            type: String
        }
    }]
});

const Sibling = mongoose.model("Sibling", siblingModel);
module.exports = Sibling;