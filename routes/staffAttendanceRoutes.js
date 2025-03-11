const express = require("express");
const router = express.Router();
const {
    addAttendance,
    getAllAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
} = require("../controller/staffAttendanceController"); // Adjust the path as necessary

// Route to add new attendance record
router.post("/add", addAttendance);

// Route to get all attendance records
router.get("/all", getAllAttendance);

// Route to get attendance record by ID
router.get("/get/:id", getAttendanceById);

// Route to update attendance record by ID
router.put("/update/:id", updateAttendance);

// Route to delete attendance record by ID
router.delete("/delete/:id", deleteAttendance);

module.exports = router;
