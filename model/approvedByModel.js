const mongoose = require("mongoose");

const approvedByModel = new mongoose.Schema({
    ApprovedByTitle: {
        type: String,
        required: true
    }
});

const ApprovedBy = mongoose.model("ApprovedBy", approvedByModel);
module.exports = ApprovedBy;