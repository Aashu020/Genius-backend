const Student = require('../model/studentModel'); // Import the Student model
const ClassModel = require('../model/Academic/classModel'); // Import the Class model
const Staff = require('../model/staffModel');
const Counter = require('../model/counterModel');
const Login = require('../model/loginModel');
const moment = require('moment-timezone');




// Controller function to save multiple student data
const saveStudentsData = async (req, res) => {
    const month = moment().format('MM');
    const year = moment().format('YYYY');
    try {
        const studentsData = req.body;  // Incoming array of student data
        // console.log(req.body);
        const results = [];
        var inc = studentsData.length;
        let counter = await Counter.findOne({ Title: `STU-${year}-${month}` });

        if (!counter) {
            counter = new Counter({ Title: `STU-${year}-${month}`, Count: inc });
        } else {
            counter.Count += inc;
        }

        // Step 1: Loop through each student and modify their data
        for (let studentData of studentsData) {
            // Step 2: Check if the StudentId already exists in the database
            const existingStudent = await Student.findOne({ StudentId: studentData.StudentId });

            if (existingStudent) {
                // Step 3: If the student already exists, skip saving and log the result
                results.push({
                    studentId: studentData.StudentId,
                    status: 'failed',
                    message: `Student with ID ${studentData.StudentId} already exists`,
                });
                continue;  // Skip this student and move to the next
            }

            // Step 4: Get the ClassId for the student's ClassName
            const classData = await ClassModel.findOne({ Class: studentData.ClassName });

            // Step 5: If class not found, skip this student and store error message
            if (!classData) {
                results.push({
                    studentId: studentData.StudentId,
                    status: 'failed',
                    message: `Class ${studentData.ClassName} not found`
                });
                continue;  // Skip this student and move to the next
            }

            // Step 6: Replace the AdmissionInClass with the ClassId
            studentData.AdmissionInClass = classData.ClassId;

            // Step 7: Create a new Student object with the modified data
            const newStudent = new Student(studentData);
            const newUser = new Login({ Id: studentData.StudentId, Password: studentData.MobileNo, Role: "Student" });


            // Step 8: Save the student data to the database
            await newStudent.save();
            await newUser.save();
            // console.log(newStudent);

            // Step 9: Push success result
            results.push({
                studentId: studentData.StudentId,
                status: 'success',
                message: 'Student data saved successfully',
            });
        }

        // Step 10: Respond with a summary of all operations
        res.status(200).json({
            success: true,
            results: results,  // Array of success/failure details for each student
        });

        counter.save();

    } catch (error) {
        console.error('Error saving student data:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while saving student data',
            error: error.message,
        });
    }
};

// Staff validation logic
const validateStaffData = (staff) => {
    const errors = [];

    // Required fields validation
    if (!staff.EmployeeId) errors.push('EmployeeId is required');
    if (!staff.Name) errors.push('Name is required');
    if (!staff.DOB) errors.push('DOB is required');
    if (!staff.DOJ) errors.push('DOJ is required');
    if (!staff.Gender) errors.push('Gender is required');
    if (!staff.MobileNo) errors.push('MobileNo is required');
    if (!staff.Salary) errors.push('Salary is required');
    if (!staff.BloodGroup) errors.push('BloodGroup is required');
    if (!staff.Email) errors.push('Email is required');
    if (!staff.MaritalStatus) errors.push('MaritalStatus is required');
    if (!staff.AadharNo) errors.push('AadharNo is required');
    if (!staff.PanNo) errors.push('PanNo is required');

    // Emergency contact validation
    if (!staff.EmergencyContact || !staff.EmergencyContact.Name || !staff.EmergencyContact.MobileNo) {
        errors.push('Valid EmergencyContact is required');
    }

    return errors;
};

module.exports = {
    validateStaffData,
};


const saveStaffData = async (req, res) => {
    const staffData = req.body;
    const month = moment().format('MM');
    const year = moment().format('YYYY');

    if (!Array.isArray(staffData)) {
        return res.status(400).json({ message: 'Data should be an array of staff records.' });
    }

    const results = [];
    var inc = staffData.length;
    let counter = await Counter.findOne({ Title: `STU-${year}-${month}` });

    if (!counter) {
        counter = new Counter({ Title: `STU-${year}-${month}`, Count: inc });
    } else {
        counter.Count += inc;
    }

    for (let i = 0; i < staffData.length; i++) {
        const staff = staffData[i];

        // Validate data
        const errors = validateStaffData(staff);
        if (errors.length > 0) {
            results.push({
                staffId: staff.EmployeeId,
                status: 'failure',
                message: `Errors: ${errors.join(', ')}`
            });
            continue;
        }

        try {
            // Create a new staff document
            const newStaff = new Staff(staff);  
            const newUser = new Login({ Id: staff.EmployeeId, Password: staff.MobileNo, Role: staff.Role });
            
            await newStaff.save(); // Save to database
            await newUser.save(); // Save to database

            results.push({
                staffId: staff.EmployeeId,
                status: 'success',
                message: 'Staff data saved successfully'
            });
            counter.save();

        } catch (error) {
            console.error('Error saving staff data:', error);
            results.push({
                staffId: staff.EmployeeId,
                status: 'failure',
                message: 'Error saving staff data'
            });
        }
    }

    res.status(200).json({ results });
};

module.exports = { saveStudentsData, saveStaffData };
