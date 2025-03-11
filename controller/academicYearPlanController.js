const AcademicYearPlan = require('../model/academicYearPlan');

// Get all academic year plans
const getAllAcademicYearPlans = async (req, res) => {
    try {
        const plans = await AcademicYearPlan.find();
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get academic year plan by ID
const getAcademicYearPlanById = async (req, res) => {
    try {
        const plan = await AcademicYearPlan.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: "Academic year plan not found" });
        }
        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new academic year plan
const createAcademicYearPlan = async (req, res) => {
    const { Title, Description, Remarks, StartDate, EndDate, Color } = req.body;

    const newPlan = new AcademicYearPlan({
        Title,
        Description,
        Remarks,
        StartDate,
        EndDate,
        Color,
    });

    try {
        const savedPlan = await newPlan.save();
        res.status(201).json(savedPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an academic year plan by ID
const updateAcademicYearPlan = async (req, res) => {
    try {
        const updatedPlan = await AcademicYearPlan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({ message: "Academic year plan not found" });
        }

        res.status(200).json(updatedPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an academic year plan by ID
const deleteAcademicYearPlan = async (req, res) => {
    try {
        const deletedPlan = await AcademicYearPlan.findByIdAndDelete(req.params.id);
        if (!deletedPlan) {
            return res.status(404).json({ message: "Academic year plan not found" });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAcademicYearPlans,
    getAcademicYearPlanById,
    createAcademicYearPlan,
    updateAcademicYearPlan,
    deleteAcademicYearPlan,
};
