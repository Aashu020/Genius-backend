const Grade = require('../model/gradeModel');

// Create a new Grade
exports.createGrade = async (req, res) => {
    const { Title, Salary } = req.body; 

    try {
        const grade = new Grade({ Title, Salary });
        await grade.save();
        res.status(201).json(grade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Grades
exports.getAllGrades = async (req, res) => {
    try {
        const grades = await Grade.find();
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a Grade by ID
exports.getGradeById = async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id);
        if (!grade) return res.status(404).json({ message: 'Grade not found' });
        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Grade by ID
exports.updateGrade = async (req, res) => {
    const { Title, Salary } = req.body;

    try {
        const grade = await Grade.findByIdAndUpdate(req.params.id, { Title, Salary }, { new: true });
        if (!grade) return res.status(404).json({ message: 'Grade not found' });
        res.status(200).json(grade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Grade by ID
exports.deleteGrade = async (req, res) => {
    try {
        const grade = await Grade.findByIdAndDelete(req.params.id);
        if (!grade) return res.status(404).json({ message: 'Grade not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
