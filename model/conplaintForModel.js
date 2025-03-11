const mongoose = require("mongoose");

const complaintForModel = new mongoose.Schema({
    ComplaintForName: {
        type: String,
        required: true
    }
});

const ComplaintFor = mongoose.model("ComplaintFor", complaintForModel);
module.exports = ComplaintFor;