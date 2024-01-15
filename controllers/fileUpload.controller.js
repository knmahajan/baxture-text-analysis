// Import the fileModel which provides functions for interacting with the database
const fileModel = require('../models/file.model');

/**
 * Handles the upload of a file, saves the file content to the database, and returns the fileId.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const uploadFile = async (req, res) => {
    try {
        // Check if a text file is uploaded, if not, return error response 
        if(!req.newFilename) {
            res.status(400).send("Please upload a text file.");
            return;
        }
        
        // Check if file other than text file is uploaded, if yes, return the error response
        if (req.fileValidationError) { 
            res.status(400).send(req.fileValidationError);
            return;
        }

        // Extract the new filename from the request that was updated in multer middleware
        const filename = req.newFilename;

        // Extract the fileId from the filename
        const fileId = filename.split("-")[1].split(".")[0];

        // Use the fileModel to create a new file record in the database
        const fileRecord = await fileModel.createFile(fileId, filename);

        // Return the fileId in response
        res.send({ "FileId": fileId });
    } catch (error) {
        console.log(error)
        // Respond with a 500 Internal Server Error status
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    uploadFile
};
