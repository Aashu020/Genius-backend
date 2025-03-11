const mongoose = require("mongoose");

const schoolSetupModel = new mongoose.Schema({
    SchoolName: {
        type: String
    },
    Address: {
        type: String
    },
    PhoneNo: {
        type: String
    },
    Website: {
        type: String
    },
    SchoolLogo: {
        type: String
    },
    EmailId: {
        type: String
    },
    StartTime:{
        type: String
    },
    EndTime:{
        type: String
    },
    SchoolStamp:{
        type: String
    },
    SalaryDate:{
        type: String
    },
    WeeklyOff:{
        type: String
    },
    PrincipleSign:{
        type: String
    },
    SchoolSign:{
        type: String
    },
    AffiliationNo:{
        type: String
    },
    UDISECode:{
        type: String
    }
});

const SchoolSetup = mongoose.model("SchoolSetup", schoolSetupModel);
module.exports = SchoolSetup;