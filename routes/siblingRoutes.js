const express = require("express");
const router = express.Router();
const {
    addSibling,
    getSiblingById,
    getAllSiblings,
    updateSibling,
    deleteSibling
} = require("../controller/siblingController"); 

// Add a new sibling
router.post("/add", addSibling);

// Get sibling by SiblingId
router.get("/get/:siblingId", getSiblingById);

// Get all siblings
router.get("/all", getAllSiblings);

// Update sibling by SiblingId
router.put("/update/:siblingId", updateSibling);

// Delete sibling by SiblingId
router.delete("/delete/:siblingId", deleteSibling);

module.exports = router;
