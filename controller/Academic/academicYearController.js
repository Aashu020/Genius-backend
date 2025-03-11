const AcademicYear = require('../../model/Academic/academicYearModel');

// Add a new academic year
exports.addAcademicYear = async (req, res) => {
    try {
        const { Year } = req.body;
        const newAcademicYear = new AcademicYear({ Year, Status: false });
        await newAcademicYear.save();
        res.status(201).json({ message: "Academic Year added successfully", newAcademicYear });
    } catch (error) {
        res.status(500).json({ message: "Error adding academic year", error: error.message });
    }
};

// Get all academic years
exports.getAllAcademicYears = async (req, res) => {
    try {
        const academicYears = await AcademicYear.find();
        res.status(200).json(academicYears);
    } catch (error) {
        res.status(500).json({ message: "Error fetching academic years", error: error.message });
    }
};

// Get academic year by Year
exports.getAcademicYearByYear = async (req, res) => {
    try {
        const academicYear = await AcademicYear.findOne({ Year: req.params.year });
        if (!academicYear) {
            return res.status(404).json({ message: "Academic Year not found" });
        }
        res.status(200).json(academicYear);
    } catch (error) {
        res.status(500).json({ message: "Error fetching academic year", error: error.message });
    }
};

// Update academic year
exports.updateAcademicYear = async (req, res) => {
    try {
        const updatedAcademicYear = await AcademicYear.findOneAndUpdate(
            { Year: req.params.year },
            req.body,
            { new: true }
        );
        if (!updatedAcademicYear) {
            return res.status(404).json({ message: "Academic Year not found" });
        }
        res.status(200).json({ message: "Academic Year updated successfully", updatedAcademicYear });
    } catch (error) {
        res.status(500).json({ message: "Error updating academic year", error: error.message });
    }
};

// Delete academic year
exports.deleteAcademicYear = async (req, res) => {
    try {
        const deletedAcademicYear = await AcademicYear.findOneAndDelete({ Year: req.params.year });
        if (!deletedAcademicYear) {
            return res.status(404).json({ message: "Academic Year not found" });
        }
        res.status(200).json({ message: "Academic Year deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting academic year", error: error.message });
    }
};

// Change status to active
exports.setActiveStatus = async (req, res) => {
    try {
        const { Year } = req.body;

        const acedemic = await AcademicYear.findOne({Year});
        if (!acedemic) {
            return res.status(404).json({ message: "Academic Year not found" });
        }

        // Set all academic years to inactive
        await AcademicYear.updateMany({}, { Status: false });

        // Set the specified academic year to active
        const updatedAcademicYear = await AcademicYear.findOneAndUpdate(
            { Year },
            { Status: true },
            { new: true }
        );

        res.status(200).json({ message: "Academic Year status set to active", updatedAcademicYear });
    } catch (error) {
        res.status(500).json({ message: "Error changing status", error: error.message });
    }
};
