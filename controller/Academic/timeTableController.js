const TimeTable = require('../../model/Academic/timeTableModel');

// Add a new time table
exports.addTimeTable = async (req, res) => {
    const { ClassId, Class, Section, Days } = req.body; // Destructuring from req.body
    const classID = ClassId + Section; // Generate ClassID

    try {
        // Check if the timetable with the ClassID already exists
        const existingTimeTable = await TimeTable.findOne({ ClassID: classID });

        if (existingTimeTable) {
            const timeTable = await TimeTable.findOneAndUpdate(
                { ClassID: classID },
                { ClassID: classID, Class, Section, Days },
                { new: true, runValidators: true }
            );
            if (!timeTable) {
                return res.status(404).json({ message: 'Time table not found' });
            }
            res.status(200).json(timeTable);
        } else {
            // Create a new timetable
            const timeTable = new TimeTable({ ClassID: classID, Class, Section, Days });
            await timeTable.save();
            return res.status(201).json(timeTable); // Respond with the newly created timetable
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};


// Get all time tables
exports.getAllTimeTables = async (req, res) => {
    try {
        const timeTables = await TimeTable.find();
        res.status(200).json(timeTables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get time table by ClassID
exports.getTimeTableByClassID = async (req, res) => {
    const classID = req.params.class + req.params.section;
    try {
        const timeTable = await TimeTable.findOne({ ClassID: classID });
        if (!timeTable) {
            return res.status(404).json({ message: 'Time table not found' });
        }
        res.status(200).json(timeTable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const timeTable = await TimeTable.findById(req.params.id);
        if (!timeTable) {
            return res.status(404).json({ message: 'Time table not found' });
        }
        res.status(200).json(timeTable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update time table
exports.updateTimeTable = async (req, res) => {
    const { ClassID, Class, Section, Days } = req.body; // Destructuring from req.body
    try {
        const timeTable = await TimeTable.findOneAndUpdate(
            { ClassID: req.params.ClassID },
            { ClassID, Class, Section, Days },
            { new: true, runValidators: true }
        );
        if (!timeTable) {
            return res.status(404).json({ message: 'Time table not found' });
        }
        res.status(200).json(timeTable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete time table
exports.deleteTimeTable = async (req, res) => {
    try {
        const timeTable = await TimeTable.findOneAndDelete({ ClassID: req.params.ClassID });
        if (!timeTable) {
            return res.status(404).json({ message: 'Time table not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};