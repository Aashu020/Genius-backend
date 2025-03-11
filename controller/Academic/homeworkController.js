const Homework = require('../../model/Academic/homeworkModel');
const upload = require('../../config/multerConfig'); // Adjust the path as necessary

// Create a new homework entry
exports.createHomework = [
  upload.single('image'), // Expecting the image field in the form to be named 'image'
  async (req, res) => {
    const { Date, Type, Class, Section, Subject, Chapter, Title, Details, Status } = req.body;
    const image = req.file ? req.file.filename : null; // Store the filename

    try {
      const homework = new Homework({ Date, Type, Class, Section, Subject, Chapter, Title, Details, Status, Image: image });
      await homework.save();
      res.status(201).json(homework);
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(error);
    }
  }
];

// Get all homework entries
exports.getAllHomeworks = async (req, res) => {
  try {
    const homeworks = await Homework.find();
    res.status(200).json(homeworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a homework entry by ID
exports.getHomeworkById = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);
    if (!homework) return res.status(404).json({ message: 'Homework not found' });
    res.status(200).json(homework);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getHomeworkByClassAndSection = async (req, res) => {
  const { id } = req.params;

  // Assuming your id format is something like "classId-section"
  const [classId, section] = id.split('-'); // Adjust the delimiter as necessary

  try {
    // Query to find homework by classId and section
    const homeworkList = await Homework.find({ Class: classId, Section: section });

    if (homeworkList.length === 0) {
      return res.status(404).json({ message: 'No homework found for this class and section' });
    }

    res.status(200).json(homeworkList);
  } catch (error) {
    console.error('Error fetching homework:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// Update a homework entry
exports.updateHomework = [
  upload.single('image'), // Expecting the image field in the form to be named 'image'
  async (req, res) => {
    const { Date, Type, Class, Section, Subject, Chapter, Title, Details, Status } = req.body;
    const image = req.file ? req.file.filename : null; // Store the filename if a new file is uploaded

    try {
      const homework = await Homework.findByIdAndUpdate(
        req.params.id,
        { Date, Type, Class, Section, Subject, Chapter, Title, Details, Status, Image: image }, 
        { new: true }
      );
      if (!homework) return res.status(404).json({ message: 'Homework not found' });
      res.status(200).json(homework);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

// Delete a homework entry
exports.deleteHomework = async (req, res) => {
  try {
    const homework = await Homework.findByIdAndDelete(req.params.id);
    if (!homework) return res.status(404).json({ message: 'Homework not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
