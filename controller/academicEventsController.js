const AcademicEvents = require('../model/academicEventsModel');

// GET all academic events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await AcademicEvents.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// GET a single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await AcademicEvents.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// POST a new event
exports.createEvent = async (req, res) => {
    try {
        const { Title, StartDate, EndDate, Time, Venue, Description, Status } = req.body;

        // Validate input
        if (!Title || !StartDate) {
            return res.status(400).json({ message: "Title and Start Date are required" });
        }

        const newEvent = new AcademicEvents({
            Title,
            StartDate,
            EndDate,
            Time,
            Venue,
            Description,
            Status
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// PUT (update) an event by ID
exports.updateEvent = async (req, res) => {
    try {
        const event = await AcademicEvents.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// DELETE an event by ID
exports.deleteEvent = async (req, res) => {
    try {
        const event = await AcademicEvents.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
