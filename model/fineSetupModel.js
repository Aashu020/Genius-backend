const mongoose = require("mongoose");

const fineSetupModel = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Amount: {
        type: Number
    }
});

const FineSetup = mongoose.model('FineSetup', fineSetupModel);
module.exports = FineSetup;