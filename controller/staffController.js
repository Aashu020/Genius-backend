const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const XLSX = require('xlsx'); // Import the xlsx package
const Staff = require('../model/staffModel');
const Counter = require('../model/counterModel');
const Login = require("../model/loginModel");

const bulkUploadStaffData = async (req, res) => {
    try {
        // Extract the uploaded staff data from the request body
        const staffData = req.body;  // Array of staff objects

        // Check if the incoming data is an array and contains data
        if (!Array.isArray(staffData) || staffData.length === 0) {
            return res.status(400).json({ message: 'Invalid data format or empty data.' });
        }

        // Validate each staff entry (can be extended with more specific checks)
        staffData.forEach(staff => {
            // Add any additional validations based on your schema here
            if (!staff.Email) {
                throw new Error('Missing required fields in staff data.');
            }
        });

        // Insert multiple staff records in one go
        const savedStaff = await Staff.insertMany(staffData);

        // Respond with success message and data
        res.status(200).json({
            message: 'Staff data uploaded successfully!',
            data: savedStaff
        });
    } catch (error) {
        console.error('Error uploading staff data:', error);
        res.status(500).json({
            message: 'Error uploading staff data.',
            error: error.message
        });

    }
};


// Add a new staff member
const addStaff = async (req, res) => {
    const month = moment().format('MM');
    const year = moment().format('YYYY');
    let id;
    try {
        console.log(req.body)
        const {
            Role, Department, Name, DOB, DOJ, Gender, Qualification,
            Category, LanguageKnown, Nationality, MobileNo, Salary,
            BloodGroup, Email, JobGrade, Experience, LastSchool,
            ReferredName, ReferredContact, Transport, Route, Address,
            City, Area, Pincode, Religion, MaritalStatus, FamilyDetail,
            EmergencyContact, TeachingSubject, Assign, AadharNo,
            PanNo, PFNo, BankName, AccountNumber, IFSCCode, HomeWorkPublish,
            ClassTeacher, Class, Status
        } = req.body;

        let counter = await Counter.findOne({ Title: `EMP-${year}-${month}` });

        if (!counter) {
            counter = new Counter({ Title: `EMP-${year}-${month}`, Count: 1 });
        } else {
            counter.Count += 1;
        }


        id = `${Role.slice(0, 3).toUpperCase()}${year}${month}${counter.Count.toString().padStart(4, '0')}`;

        const newStaff = new Staff({
            EmployeeId: id, Role, Department, Name, DOB, DOJ, Gender, Qualification,
            Category, LanguageKnown, Nationality, MobileNo, Salary,
            BloodGroup, Email, JobGrade, Experience, LastSchool,
            ReferredName, ReferredContact, Transport, Route, Address,
            City, Area, Pincode, Religion, MaritalStatus, FamilyDetail: JSON.parse(FamilyDetail),
            EmergencyContact: JSON.parse(EmergencyContact), TeachingSubject, Assign: JSON.parse(Assign), AadharNo,
            PanNo, PFNo, BankName, AccountNumber, IFSCCode, HomeWorkPublish,
            ClassTeacher, Class, Status: Status || "Active"
        });

        // Handle file uploads
        if (req.files) {
            if (req.files.Photo) newStaff.Documents.Photo = req.files.Photo[0].filename;
            if (req.files.QualificationCertificate)
                newStaff.Documents.QualificationCertificate = req.files.QualificationCertificate[0].filename;
            if (req.files.ExperienceLetter)
                newStaff.Documents.ExperienceLetter = req.files.ExperienceLetter[0].filename;
        }

        const newUser = new Login({ Id: id, Password: newStaff.MobileNo, Role: "Employee", DesignationName: newStaff.Role });
        await newUser.save();
        await counter.save();
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

// Get all staff members
const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find();
        res.status(200).json(staff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get staff member by EmployeeId
const getStaffByEmployeeId = async (req, res) => {
    try {
        const staff = await Staff.findOne({ EmployeeId: req.params.EmployeeId });
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.status(200).json(staff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update entire staff data
const updateStaff = async (req, res) => {
    const { EmployeeId } = req.params; // Get the EmployeeId from the route parameter

    try {
        console.log(req.body);
        // Find the staff document by EmployeeId
        const staff = await Staff.findOne({ EmployeeId: EmployeeId });

        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        // Initialize an object to store document filenames if files are uploaded
        const documents = {};

        // Check if files are uploaded and handle the document fields accordingly
        if (req.files) {
            if (req.files.Photo) {
                documents.Photo = req.files.Photo[0].filename;
            }
            if (req.files.QualificationCertificate) {
                documents.QualificationCertificate = req.files.QualificationCertificate[0].filename;
            }
            if (req.files.ExperienceLetter) {
                documents.ExperienceLetter = req.files.ExperienceLetter[0].filename;
            }
        }

        // Prepare the updated staff data (excluding the Documents field for now)
        const updatedStaffData = {
            ...req.body, // Spread the new data from the request body
        };

        // Handle fields that need to be parsed as JSON (arrays or objects)
        if (updatedStaffData.Assign) {
            updatedStaffData.Assign = JSON.parse(updatedStaffData.Assign);
        }

        if (updatedStaffData.LanguageKnown) {
            updatedStaffData.LanguageKnown = JSON.parse(updatedStaffData.LanguageKnown);
        }

        if (updatedStaffData.TeachingSubject) {
            updatedStaffData.TeachingSubject = JSON.parse(updatedStaffData.TeachingSubject);
        }

        if (updatedStaffData.Class) {
            updatedStaffData.Class = JSON.parse(updatedStaffData.Class);
        }

        // Handle fields that are JSON objects but might be stringified
        if (updatedStaffData.FamilyDetail) {
            updatedStaffData.FamilyDetail = JSON.parse(updatedStaffData.FamilyDetail);
        }

        if (updatedStaffData.EmergencyContact) {
            updatedStaffData.EmergencyContact = JSON.parse(updatedStaffData.EmergencyContact);
        }

        if (updatedStaffData.Documents) {
            updatedStaffData.Documents = JSON.parse(updatedStaffData.Documents);
        }

        // Update the staff member in the database with the new data (except Documents)
        const updatedStaff = await Staff.findOneAndUpdate(
            { EmployeeId: EmployeeId },
            updatedStaffData,
            { new: true } // Return the updated document
        );

        // Now, update the Documents field separately, if any documents were uploaded
        if (Object.keys(documents).length > 0) {
            await Staff.updateOne(
                { EmployeeId: EmployeeId },
                {
                    $set: {
                        'Documents.Photo': documents.Photo,
                        'Documents.QualificationCertificate': documents.QualificationCertificate,
                        'Documents.ExperienceLetter': documents.ExperienceLetter,
                    },
                }
            );
        }

        res.status(200).json({
            message: 'Staff data updated successfully',
            updatedStaff
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Delete staff member
const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findOneAndDelete({ EmployeeId: req.params.EmployeeId });
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        // Delete files associated with the staff member
        if (staff.Documents.Photo) {
            fs.unlinkSync(path.join(__dirname, '../uploads', staff.Documents.Photo));
        }
        if (staff.Documents.QualificationCertificate) {
            fs.unlinkSync(path.join(__dirname, '../uploads', staff.Documents.QualificationCertificate));
        }
        if (staff.Documents.ExperienceLetter) {
            fs.unlinkSync(path.join(__dirname, '../uploads', staff.Documents.ExperienceLetter));
        }

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

module.exports = {
    addStaff,
    updateStaff,
    getAllStaff,
    getStaffByEmployeeId,
    bulkUploadStaffData,
    deleteStaff,
};
