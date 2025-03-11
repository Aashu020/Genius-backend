const express = require("express");
const router = express.Router();
const {
    getAllApprovedBy,
    getApprovedByById,
    createApprovedBy,
    updateApprovedBy,
    deleteApprovedBy,
} = require("../controller/approvedByController");

// GET all approvedBy records
router.get("/all", getAllApprovedBy);

// GET approvedBy record by ID
router.get("/get/:id", getApprovedByById);

// POST a new approvedBy record
router.post("/add", createApprovedBy);

// PUT (update) an approvedBy record
router.put("/update/:id", updateApprovedBy);

// DELETE an approvedBy record
router.delete("/delete/:id", deleteApprovedBy);

module.exports = router;
