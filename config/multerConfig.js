const multer = require('multer');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substring(2, 6);
        cb(null, uniqueSuffix + file.originalname); // Use a unique name
    }
});

// Create the multer upload middleware
const upload = multer({ storage: storage });

// Export the upload middleware for use in routes
module.exports = upload;
