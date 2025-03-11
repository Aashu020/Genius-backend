const AcademicYearInfo = require('../model/academicYearInfo'); // Update the path as necessary

// Get all academic years
exports.getAllAcademicYears = async (req, res) => {
    try {
        const academicYears = await AcademicYearInfo.find();
        res.status(200).json(academicYears);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an academic year by ID
exports.getAcademicYearById = async (req, res) => {
    try {
        const academicYear = await AcademicYearInfo.findById(req.params.id);
        if (!academicYear) return res.status(404).json({ message: 'Academic Year not found' });
        res.status(200).json(academicYear);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new academic year
exports.createAcademicYear = async (req, res) => {
    function getMonthNumberFromName(monthName) {
        return new Date(`${monthName} 1, 2022`).getMonth() + 1;
    }
    const { StartYear, StartMonth, EndYear, EndMonth, Status } = req.body;
    const newAcademicYear = new AcademicYearInfo({ StartYear, StartMonth, EndYear, EndMonth, StartMonthNumber: getMonthNumberFromName(StartMonth), EndMonthNumber: getMonthNumberFromName(EndMonth), AcademicYear: `${StartYear}-${EndYear}`, Status: "DeActive" });

    try {
        const savedAcademicYear = await newAcademicYear.save();
        res.status(201).json(savedAcademicYear);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an academic year
exports.updateAcademicYear = async (req, res) => {
    try {
        const updatedAcademicYear = await AcademicYearInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAcademicYear) return res.status(404).json({ message: 'Academic Year not found' });
        res.status(200).json(updatedAcademicYear);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an academic year
exports.deleteAcademicYear = async (req, res) => {
    try {
        const deletedAcademicYear = await AcademicYearInfo.findByIdAndDelete(req.params.id);
        if (!deletedAcademicYear) return res.status(404).json({ message: 'Academic Year not found' });
        res.status(200).json({ message: 'Academic Year deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Change status to active
exports.setActiveStatus = async (req, res) => {
    try {

        const acedemic = await AcademicYearInfo.findById(req.params.id);

        if (!acedemic) {
            return res.status(404).json({ message: "Academic Year not found" });
        }

        // Set all academic years to inactive
        await AcademicYearInfo.updateMany({}, { Status: "DeActive" });

        // Set the specified academic year to active
        const updatedAcademicYear = await AcademicYearInfo.findByIdAndUpdate(
            req.params.id,
            { Status: "Active" },
            { new: true }
        );

        res.status(200).json({ message: "Academic Year status set to active", updatedAcademicYear });
    } catch (error) {
        res.status(500).json({ message: "Error changing status", error: error.message });
    }
};

exports.getActiveData = async (req, res) => {
    try {
        const academicYear = await AcademicYearInfo.findOne({ Status: "Active" });
        if (!academicYear) return res.status(404).json({ message: 'No Active Academic Year found' });

        res.status(200).json(academicYear);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
