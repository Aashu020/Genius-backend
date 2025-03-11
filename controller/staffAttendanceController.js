const StaffAttendance = require("../model/staffAttendanceModel");

// Add new attendance record
const addAttendance = async (req, res) => {
    const { Date, Role, Attendance } = req.body;

    try {
        const existingRecord = await StaffAttendance.findOne({ Date, Role });

        if (existingRecord) {
            return res.status(400).json({ message: 'Attendance record for this Date, and Role already exists.' });
        }
        const newAttendance = new StaffAttendance({
            Date,
            Role,
            Attendance
        });

        await newAttendance.save();
        res.status(201).json(newAttendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all attendance records
const getAllAttendance = async (req, res) => {
    try {
        const attendances = await StaffAttendance.find();
        res.json(attendances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get attendance record by ID
const getAttendanceById = async (req, res) => {
    try {
        const attendance = await StaffAttendance.findById(req.params.id);
        if (!attendance) return res.status(404).json({ message: "Attendance record not found" });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update attendance record by ID
const updateAttendance = async (req, res) => {
    const { Date, Role, Attendance } = req.body;

    try {
        const updatedAttendance = await StaffAttendance.findByIdAndUpdate(
            req.params.id,
            { Date, Role, Attendance },
            { new: true, runValidators: true }
        );

        if (!updatedAttendance) return res.status(404).json({ message: "Attendance record not found" });
        res.json(updatedAttendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete attendance record by ID
const deleteAttendance = async (req, res) => {
    try {
        const deletedAttendance = await StaffAttendance.findByIdAndDelete(req.params.id);
        if (!deletedAttendance) return res.status(404).json({ message: "Attendance record not found" });
        res.json({ message: "Attendance record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addAttendance,
    getAllAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
};
