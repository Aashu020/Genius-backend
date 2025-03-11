const HomeworkType = require('../model/homeworkTypeModel');

// Get all Homework Types
exports.getAllHomeworkTypes = async (req, res) => {
    try {
        const homeworkTypes = await HomeworkType.find();
        res.status(200).json(homeworkTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Homework Type by ID
exports.getHomeworkTypeById = async (req, res) => {
    try {
        const homeworkType = await HomeworkType.findById(req.params.id);
        if (!homeworkType) {
            return res.status(404).json({ message: 'Homework Type not found' });
        }
        res.status(200).json(homeworkType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new Homework Type
exports.createHomeworkType = async (req, res) => {
    const homeworkType = new HomeworkType({
        HomeworkTypeTitle: req.body.HomeworkTypeTitle,
    });

    try {
        const savedHomeworkType = await homeworkType.save();
        res.status(201).json(savedHomeworkType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a Homework Type
exports.updateHomeworkType = async (req, res) => {
    try {
        const homeworkType = await HomeworkType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!homeworkType) {
            return res.status(404).json({ message: 'Homework Type not found' });
        }
        res.status(200).json(homeworkType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Homework Type
exports.deleteHomeworkType = async (req, res) => {
    try {
        const homeworkType = await HomeworkType.findByIdAndDelete(req.params.id);
        if (!homeworkType) {
            return res.status(404).json({ message: 'Homework Type not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
