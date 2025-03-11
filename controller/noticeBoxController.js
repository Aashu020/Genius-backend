const NoticeBox = require('../model/noticeBoxModel');

// GET all notices
exports.getAllNotices = async (req, res) => {
    try {
        const notices = await NoticeBox.find();
        res.status(200).json(notices);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// GET a single notice by ID
exports.getNoticeById = async (req, res) => {
    try {
        const notice = await NoticeBox.findById(req.params.id);
        if (!notice) {
            return res.status(404).json({ message: "Notice not found" });
        }
        res.status(200).json(notice);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// POST a new notice
exports.createNotice = async (req, res) => {
    try {
        const { Title, Date, Time, Description, Status } = req.body;

        // Validate input
        if (!Title || !Date) {
            return res.status(400).json({ message: "Title and Date are required" });
        }

        const newNotice = new NoticeBox({
            Title,
            Date,
            Time,
            Description,
            Status
        });

        await newNotice.save();
        res.status(201).json(newNotice);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// PUT (update) a notice by ID
exports.updateNotice = async (req, res) => {
    try {
        const notice = await NoticeBox.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!notice) {
            return res.status(404).json({ message: "Notice not found" });
        }
        res.status(200).json(notice);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// DELETE a notice by ID
exports.deleteNotice = async (req, res) => {
    try {
        const notice = await NoticeBox.findByIdAndDelete(req.params.id);
        if (!notice) {
            return res.status(404).json({ message: "Notice not found" });
        }
        res.status(200).json({ message: "Notice deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
