const mongoose = require("mongoose");

const departmentModel = new mongoose.Schema({
    DepartmentName: {
        type: String,
        required: true
    },
    Designation: [
        {
            DesignationName: {
                type: String
            },
            Description: {
                type: String
            }
        }
    ],
    Description: {
        type: String,
        required: true
    }
});

const Department = mongoose.model("Department", departmentModel);
module.exports = Department;
