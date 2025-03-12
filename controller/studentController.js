const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const Counter = require('../model/counterModel');
const Student = require('../model/studentModel');
const Login = require('../model/loginModel');
const SiblingModel = require('../model/SiblingModel');
const XLSX = require('xlsx'); // Import the xlsx package
const FeeData = require('../model/feeDataModel');
const AcademicYearInfo = require('../model/academicYearInfo');
const FeeSlab = require('../model/feeSlabModel');

const bulkUploadStudentData = async (req, res) => {
    try {
        // Extract the uploaded student data from the request body
        const studentData = req.body;  // Array of student objects

        // Check if the incoming data is an array and contains data
        if (!Array.isArray(studentData) || studentData.length === 0) {
            return res.status(400).json({ message: 'Invalid data format or empty data.' });
        }

        // Validate each student entry
        studentData.forEach(student => {
            // Add any additional validations based on your student schema here

            if (!student.Email) {
                throw new Error('Missing required fields in staff data.');
            }

            // Additional optional field validations can be added as needed
            // For example, you might want to validate the date formats for DOB or DOJ
        });

        // Insert multiple student records in one go
        const savedStudents = await Student.insertMany(studentData);

        // Respond with success message and data
        res.status(200).json({
            message: 'Student data uploaded successfully!',
            data: savedStudents
        });

    } catch (error) {
        console.error('Error uploading student data:', error);
        res.status(500).json({
            message: 'Error uploading student data.',
            error: error.message
        });
    }
};


// Add a new student
const addStudent = async (req, res) => {
    console.log(req.body);
    const month = moment().format('MM');
    const year = moment().format('YYYY');
    let id;
    let sibDataToSave;

    try {
        // Generate unique StudentId
        let counter = await Counter.findOne({ Title: `STU-${year}-${month}` });

        if (!counter) {
            counter = new Counter({ Title: `STU-${year}-${month}`, Count: 1 });
        } else {
            counter.Count += 1;
        }

        id = `STU${year}${month}${counter.Count.toString().padStart(4, '0')}`;

        // Handle Sibling Logic
        if (req.body.SiblingStatus) {
            const sibData = await SiblingModel.findOne({ ExistingStudentId: req.body.SibId }); // Use req.body.SibId

            if (sibData) {
                // If sibling data exists, push the new student to the existing sibling array
                sibData.Sibling.push({
                    StudentId: id,
                    StudentName: req.body.StudentName
                });

                sibDataToSave = {
                    Id: sibData.SiblingId,
                    Status: true
                };

                await sibData.save(); // Save the updated sibling data
            } else {
                let counter = await Counter.findOne({ Title: `SIB-${year}-${month}` });

                if (!counter) {
                    counter = new Counter({ Title: `SIB-${year}-${month}`, Count: 1 });
                } else {
                    counter.Count += 1;
                }
                let siblingId = `SIB${year}${month}${counter.Count.toString().padStart(4, '0')}`;

                var exeStuData = await Student.findOne({ StudentId: req.body.SibId });
                exeStuData.SiblingStatus = true;
                exeStuData.Sibling.Id = siblingId;
                exeStuData.Sibling.Status = false;

                const sibling = new SiblingModel({
                    SiblingId: siblingId,
                    StudentId: req.body.SibId, // Adjust as necessary
                    StudentName: req.body.SibName, // Adjust as necessary
                    Sibling: [{
                        StudentId: id,
                        StudentName: req.body.StudentName
                    }]
                });

                sibDataToSave = {
                    Id: siblingId,
                    Status: true
                };

                await exeStuData.save();
                await sibling.save();
                await counter.save();
            }
        }

        // Create the new student
        const newStudent = new Student({
            StudentName: req.body.StudentName,
            StudentId: id,
            DOB: req.body.DOB,
            Gender: req.body.Gender,
            Religion: req.body.Religion,
            BloodGroup: req.body.BloodGroup,
            Category: req.body.Category,
            Height: req.body.Height,
            Weight: req.body.Weight,
            AadharNumber: req.body.AadharNumber,
            MobileNo: req.body.MobileNo,
            Email: req.body.Email,
            Medium:req.body.Medium,
            House: req.body.House,
            Address: req.body.Address,
            City: req.body.City,
            Area: req.body.Area,
            Pincode: req.body.Pincode,
            AdmissionDate: req.body.AdmissionDate,
            ClassName: req.body.ClassName,
            Stream: req.body.Stream,
            AdmissionInClass: req.body.AdmissionInClass,
            Section: req.body.Section,
            FeeCategory: req.body.FeeCategory,
            RollNo: req.body.RollNo,
            LastSchoolAttended: req.body.LastSchoolAttended,
            IdentificationMark: req.body.IdentificationMark,
            SourceOfAdmission: req.body.SourceOfAdmission,
            TransportNeeded: req.body.TransportNeeded !== undefined ? req.body.TransportNeeded : false,
            Route: req.body.Route,
            FeeDiscount: req.body.FeeDiscount,
            BankName: req.body.BankName,
            BankAccountNumber: req.body.BankAccountNumber,
            IFSC: req.body.IFSC,
            Disability: req.body.Disability || false,
            DisabilityName: req.body.DisabilityName,
            Discount: req.body.Discount,
            Orphan: req.body.Orphan,
            SiblingStatus: req.body.SiblingStatus,
            Sibling: sibDataToSave,
            Subject: req.body.Subject,
            FatherDetail: JSON.parse(req.body.FatherDetail),
            MotherDetails: JSON.parse(req.body.MotherDetails),
            EmergencyContact: JSON.parse(req.body.EmergencyContact),
            Document: {
                StudentPhoto: req.files?.StudentPhoto ? req.files.StudentPhoto[0].filename : null,
                Birth: req.files?.Birth ? req.files.Birth[0].filename : null,
                Leaving: req.files?.Leaving ? req.files.Leaving[0].filename : null,
                FatherPhoto: req.files?.FatherPhoto ? req.files.FatherPhoto[0].filename : null,
                MotherPhoto: req.files?.MotherPhoto ? req.files.MotherPhoto[0].filename : null,
            },
        });

        console.log({ Id: id, Password: req.body.MobileNo, Role: "Student" });
        console.log(req.body);

        const newUser = new Login({ Id: id, Password: req.body.MobileNo, Role: "Student" });
        await newUser.save();
        await counter.save();
        await newStudent.save();

        // Now create fee data
        const { AdmissionInClass } = req.body;

        // Fee Creation logic
        const academicYear = await AcademicYearInfo.findOne({ Status: "Active" });
        if (!academicYear) {
            return res.status(400).json({ message: "Active Academic Year not found" });
        }

        const feeId = `${id}${academicYear.StartYear}${academicYear.EndYear}`;
        let feeData = await FeeData.findOne({ FeeID: feeId });
        if (!feeData) {
            const feeSlab = await FeeSlab.findOne({ ClassId: AdmissionInClass });
            if (!feeSlab) {
                return res.status(400).json({ message: "Fee Slab for the Class is missing" });
            }

            var temp = feeSlab.Fees.find(val => val.Name.trim().toLowerCase() === "tuition fee")

            var totalTuFee = temp?.Times * temp?.Amount

            // var finalTuFee = totalTuFee - (totalTuFee * (Number(req.body.FeeDiscount) / 100));

            // console.log(finalTuFee);

            feeData = new FeeData({
                FeeID: feeId,
                StudentId: id,
                Payments: [],
                RemainingFee: feeSlab.TotalFee - (totalTuFee * (Number(req.body.FeeDiscount) / 100)),
                TotalFee: feeSlab.TotalFee - (totalTuFee * (Number(req.body.FeeDiscount) / 100)),
                Balance: 0,
            });

            console.log(feeData)

            await feeData.save();
        }

        // Respond with the new student and fee data
        res.status(201).json({ newStudent, feeData });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};



// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get student by StudentId
const getStudentByStudentId = async (req, res) => {
    try {
        const student = await Student.findOne({ StudentId: req.params.StudentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update student
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ StudentId: req.params.StudentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update fields only if new data is provided
        Object.assign(student, req.body);

        // Update nested details
        if (req.body.FatherDetail) {
            student.FatherDetail = { ...student.FatherDetail, ...req.body.FatherDetail };
        }
        if (req.body.MotherDetails) {
            student.MotherDetails = { ...student.MotherDetails, ...req.body.MotherDetails };
        }

        // Handle file uploads
        if (req.files) {
            // Check for Student Photo
            if (req.files['Document[StudentPhoto]'] && req.files['Document[StudentPhoto]'][0]) {
                // Only delete old file if it exists and is not null
                if (student.Document.StudentPhoto) {
                    const oldFilePath = path.join(__dirname, '../uploads', student.Document.StudentPhoto);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
                student.Document.StudentPhoto = req.files['Document[StudentPhoto]'][0].filename;
            }

            // Check for Birth Document
            if (req.files['Document[Birth]'] && req.files['Document[Birth]'][0]) {
                if (student.Document.Birth) {
                    const oldFilePath = path.join(__dirname, '../uploads', student.Document.Birth);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
                student.Document.Birth = req.files['Document[Birth]'][0].filename;
            }

            // Check for Leaving Document
            if (req.files['Document[Leaving]'] && req.files['Document[Leaving]'][0]) {
                if (student.Document.Leaving) {
                    const oldFilePath = path.join(__dirname, '../uploads', student.Document.Leaving);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
                student.Document.Leaving = req.files['Document[Leaving]'][0].filename;
            }

            // Check for Father's Photo
            if (req.files['Document[FatherPhoto]'] && req.files['Document[FatherPhoto]'][0]) {
                if (student.Document.FatherPhoto) {
                    const oldFilePath = path.join(__dirname, '../uploads', student.Document.FatherPhoto);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
                student.Document.FatherPhoto = req.files['Document[FatherPhoto]'][0].filename;
            }

            // Check for Mother's Photo
            if (req.files['Document[MotherPhoto]'] && req.files['Document[MotherPhoto]'][0]) {
                if (student.Document.MotherPhoto) {
                    const oldFilePath = path.join(__dirname, '../uploads', student.Document.MotherPhoto);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
                student.Document.MotherPhoto = req.files['Document[MotherPhoto]'][0].filename;
            }
        }

        await student.save();
        res.status(200).json(student);
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(400).json({ message: error.message });
    }
};




// Delete student
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ StudentId: req.params.StudentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Delete files associated with the student
        if (student.Document.StudentPhoto) {
            fs.unlinkSync(path.join(__dirname, '../uploads', student.Document.StudentPhoto));
        }
        if (student.Document.Birth) {
            fs.unlinkSync(path.join(__dirname, '../uploads', student.Document.Birth));
        }
        if (student.Document.Leaving) {
            fs.unlinkSync(path.join(__dirname, '../uploads', student.Document.Leaving));
        }
        if (student.Document.FatherPhoto) {
            fs.unlinkSync(path.join(__dirname, '../uploads', student.Document.FatherPhoto));
        }
        if (student.Document.MotherPhoto) {
            fs.unlinkSync(path.join(__dirname, '../uploads', student.Document.MotherPhoto));
        }

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createDataForAllStudents = async (req, res) => {
    try {
        // Fetch the active academic year information
        const academicYear = await AcademicYearInfo.findOne({ Status: "Active" });

        if (!academicYear) {
            return res.status(400).json({ message: "No active academic year found" });
        }

        // Get all students from the database
        const students = await Student.find();

        // Loop through each student
        for (let student of students) {
            const { StudentId, AdmissionInClass, FeeDiscount } = student;

            // Generate FeeID based on StudentId and academic year
            const id = StudentId + academicYear.StartYear + academicYear.EndYear;

            // Check if FeeData already exists for the student
            let feeData = await FeeData.findOne({ FeeID: id });

            // If FeeData doesn't exist, create it
            if (!feeData) {
                const feeSlab = await FeeSlab.findOne({ ClassId: AdmissionInClass });

                // If fee slab for the class is not found, skip to next student
                if (!feeSlab) {
                    console.log(`Fee Slab not found for Class: ${AdmissionInClass}. Skipping student: ${StudentId}`);
                    continue; // Skip to the next student
                }

                var temp = feeSlab.Fees.find(val => val.Name.trim().toLowerCase() === "tuition fee")

                var totalTuFee = temp?.Times * temp?.Amount
                console.log(temp)
                console.log(typeof temp?.Amount)

                // var finalTuFee = totalTuFee - (totalTuFee * ((Number(FeeDiscount) || 0) / 100));

                // Create new fee data
                feeData = new FeeData({
                    FeeID: id,
                    StudentId,
                    Payments: [],
                    RemainingFee: feeSlab.TotalFee - (Number(FeeDiscount) ? (totalTuFee * (Number(FeeDiscount) / 100)) : 0),
                    TotalFee: feeSlab.TotalFee - (Number(FeeDiscount) ? (totalTuFee * (Number(FeeDiscount) / 100)) : 0),
                    Balance: 0,
                });

                // Save the new fee data to the database
                await feeData.save();
            }
        }

        // Send a success response after processing all students
        return res.status(201).json({ message: "Fee data created for all students successfully" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    addStudent,
    updateStudent,
    getAllStudents,
    bulkUploadStudentData,
    getStudentByStudentId,
    deleteStudent,
    createDataForAllStudents,
};