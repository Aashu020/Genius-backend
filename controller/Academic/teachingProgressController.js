const TeachingProgress = require('../../model/Academic/teachingProgressModel'); 

// Create a new teaching progress entry
exports.createTeachingProgress = async (req, res) => {
    const { Id, AcademicYear, Class, Section, Progress } = req.body; 

    try {
        const teachingProgress = new TeachingProgress({ Id, AcademicYear, Class, Section, Progress });
        await teachingProgress.save();
        res.status(201).json(teachingProgress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all teaching progress entries
exports.getAllTeachingProgress = async (req, res) => {
    try {
        const teachingProgressList = await TeachingProgress.find();
        res.status(200).json(teachingProgressList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a teaching progress entry by Id
exports.getTeachingProgressById = async (req, res) => {
    try {
        const teachingProgress = await TeachingProgress.findOne({ Id: req.params.id }); // Use Id instead of _id
        if (!teachingProgress) return res.status(404).json({ message: 'Teaching progress not found' });
        res.status(200).json(teachingProgress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a teaching progress entry
exports.updateTeachingProgress = async (req, res) => {
    const { AcademicYear, Class, Section, Progress } = req.body; 

    try {
        const teachingProgress = await TeachingProgress.findOneAndUpdate(
            { Id: req.params.id }, // Use Id instead of _id
            { AcademicYear, Class, Section, Progress },
            { new: true, runValidators: true }
        );
        if (!teachingProgress) return res.status(404).json({ message: 'Teaching progress not found' });
        res.status(200).json(teachingProgress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a teaching progress entry
exports.deleteTeachingProgress = async (req, res) => {
    try {
        const teachingProgress = await TeachingProgress.findOneAndDelete({ Id: req.params.id }); // Use Id instead of _id
        if (!teachingProgress) return res.status(404).json({ message: 'Teaching progress not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
