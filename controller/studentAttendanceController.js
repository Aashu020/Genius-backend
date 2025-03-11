const StudentAttendance = require('../model/studentAttendanceModel');

// Create a new attendance record
exports.createAttendance = async (req, res) => {
    const { Date, Class, Section, Attendance } = req.body; // Destructure fields

    try {
        // Check if an attendance record already exists for the given Date, Class, and Section
        const existingRecord = await StudentAttendance.findOne({ Date, Class, Section });

        if (existingRecord) {
            return res.status(400).json({ message: 'Attendance record for this Date, Class, and Section already exists.' });
        }

        const studentAttendance = new StudentAttendance({ Date, Class, Section, Attendance });
        await studentAttendance.save();
        res.status(201).json(studentAttendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};


// Get all attendance records
exports.getAllAttendance = async (req, res) => {
    try {
        const attendanceList = await StudentAttendance.find();
        res.status(200).json(attendanceList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get attendance record by ID
exports.getAttendanceById = async (req, res) => {

    try {
        const attendance = await StudentAttendance.findOne(req.params.id); // Use _id by default
        if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAttendanceByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;  // Extract studentId from the request params

        // Find all attendance records where the StudentId exists in the Attendance array
        const attendanceRecords = await StudentAttendance.find({
            "Attendance.StudentId": studentId
        });

        // If no records are found
        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(404).json({
                message: "No attendance records found for this student."
            });
        }

        // If records are found, send them in the response
        res.status(200).json({
            studentId,
            attendanceRecords
        });
    } catch (error) {
        console.error("Error retrieving attendance: ", error);
        res.status(500).json({
            message: "Server error while retrieving attendance.",
            error: error.message
        });
    }
};

// Update an attendance record
exports.updateAttendance = async (req, res) => {
    const { Date, Class, Section, Attendance } = req.body; // Destructure fields

    try {
        const attendance = await StudentAttendance.findByIdAndUpdate(
            req.params.id,
            { Date, Class, Section, Attendance },
            { new: true, runValidators: true }
        );
        if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
    try {
        const attendance = await StudentAttendance.findByIdAndDelete(req.params.id); // Use _id by default
        if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
