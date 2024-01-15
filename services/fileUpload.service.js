// Import necessary modules
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Destination directory for file uploads
const uploadDirectory = path.join(__dirname, '..', 'uploads');

// Create the "uploads" folder if it doesn't exist
fs.mkdir(uploadDirectory, { recursive: true });

// Configure multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename based on the current timestamp
    const uniqueSuffix = Date.now();
    const newFilename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    
    // Attach the new filename to the request object for later use
    req.newFilename = newFilename;

    // Callback with the new filename
    cb(null, newFilename);
  }
});

// Configure multer settings including storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Check if the file is of mimetype 'text/plain'
        if (file.mimetype === 'text/plain') {
            cb(null, true);
        } else {
            // If not, reject the file with an error message
            cb(new Error('Only text files are allowed!'), false);
        }
    },
});

module.exports = upload;
