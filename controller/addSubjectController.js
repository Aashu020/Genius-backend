const SubjectModel = require('../model/addSubjectModel');

// Create a new subject
exports.createSubject = async (req, res) => {
    const { Subject } = req.body; // Destructure fields

    try {
        const subject = new SubjectModel({ Subject });
        await subject.save();
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await SubjectModel.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a subject by ID
exports.getSubjectById = async (req, res) => {
    try {
        const subject = await SubjectModel.findById(req.params.id);
        if (!subject) return res.status(404).json({ message: 'Subject not found' });
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a subject
exports.updateSubject = async (req, res) => {
    const { Subject } = req.body; // Destructure fields

    try {
        const subject = await SubjectModel.findByIdAndUpdate(
            req.params.id,
            { Subject },
            { new: true, runValidators: true }
        );
        if (!subject) return res.status(404).json({ message: 'Subject not found' });
        res.status(200).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a subject
exports.deleteSubject = async (req, res) => {
    try {
        const subject = await SubjectModel.findByIdAndDelete(req.params.id);
        if (!subject) return res.status(404).json({ message: 'Subject not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
