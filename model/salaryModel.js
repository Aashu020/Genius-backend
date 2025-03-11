const mongoose = require("mongoose");

const salaryModel = new mongoose.Schema({
    
});

const Salary = mongoose.model("Salary", salaryModel);
module.exports = Salary;
