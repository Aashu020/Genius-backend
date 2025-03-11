const mongoose = require('mongoose');

const staffModel = new mongoose.Schema({
    EmployeeId: {
        type: String,
        required: true,
        unique: true
    },
    Role: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: false
    },
    Name: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    DOJ: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Category: {
        type: String
    },
    LanguageKnown: [String],
    Nationality: {
        type: String,
    },
    MobileNo: {
        type: String,
        required: true
    },
    Salary: {
        type: String,
        required: true
    },
    BloodGroup: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    JobGrade: {
        type: String,
        required: true
    },
    Experience: {
        type: String
    },
    Qualification:{
        type: String
    },
    LastSchool: {
        type: String
    },
    ReferredName: {
        type: String
    },
    ReferredContact: {
        type: String
    },
    Transport: {
        type: Boolean
    },
    Route: {
        type: String
    },
    Address: {
        type: String
    },
    City: {
        type: String
    },
    Area: {
        type: String
    },
    Pincode: {
        type: String
    },
    Religion: {
        type: String
    },
    MaritalStatus: {
        type: String,
        required: true
    },
    FamilyDetail: {
        MiddleName: {
            type: String
        },
        MobileNo: {
            type: String
        },
        EmailId: {
            type: String
        }
    },
    EmergencyContact: {
        Name: {
            type: String
        },
        MobileNo: {
            type: String
        },
    },
    Documents: {
        Photo: {
            type: String
        },
        QualificationCertificate: {
            type: String
        },
        ExperienceLetter: {
            type: String
        }
    },
    TeachingSubject: [String],
    Assign: [{
        Class: {
            type: String
        },
        ClassId: {
            type: String
        },
        Section: {
            type: String
        },
        Subject: {
            type: String
        }
    }],
    AadharNo: {
        type: String,
        required: true
    },
    PanNo: {
        type: String,
        required: true
    },
    PFNo: {
        type: String
    },
    BankName: {
        type: String
    },
    AccountNumber: {
        type: String
    },
    IFSCCode: {
        type: String
    },
    HomeWorkPublish: {
        type: Boolean
    },
    ClassTeacher: {
        type: Boolean
    },
    Class: [String],
    Status: {
        type: String,
        required: true,
        default: "Active"
    }
});

const Staff = mongoose.model("Staff", staffModel);
module.exports = Staff;