const mongoose = require("mongoose");

const purposeModel = new mongoose.Schema({
    PurposeTitle: {
        type: String,
        required: true
    }
});

const Purpose = mongoose.model("Purpose", purposeModel);
module.exports = Purpose;