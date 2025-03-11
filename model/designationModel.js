const mongoose = require("mongoose");

const designationModel = new mongoose.Schema({
    DesignationName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
});

const Designation = mongoose.model("Designation", designationModel);
module.exports = Designation;