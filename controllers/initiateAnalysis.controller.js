const countWords = require('../helpers/countWords.helper');
const countUniqueWords = require('../helpers/countUniqueWords.helper');
const topKWords = require('../helpers/topKWords.helper');
const fileModel = require('../models/file.model');
const fs = require('fs');
const path = require('path');

/**
 * Function to initiate analysis based on the specified task for the specified fileId and returns taskId of the task
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const initiateAnalysis = async (req, res) => {
    try {
        // Validate required parameters
        if (!req.body.fileId) {
            return res.status(400).send(`Parameter fileId is required.`);
        }
        if (!req.body.taskName) {
            return res.status(400).send(`Parameter taskName is required.`);
        }

        // Allowed tasks for analysis
        const allowedTasks = ['count words', 'count unique words', 'top k words'];
        
        // Check if the specified task is valid
        if (!allowedTasks.includes(req.body.taskName.toLowerCase())) {
            return res.status(400).send(`taskName should be one of ${allowedTasks.join(', ')}.`);
        }

        // Retrieve file details using fileId
        const fileDetails = await fileModel.getFile(req.body.fileId);
        const fileName = fileDetails.filename;

        // Create the full path to the file using path.join
        const filePath = path.join(__dirname, '..', 'uploads', fileName);

        let fileContent;
        // Read the content of the file synchronously
        try {
            fileContent = fs.readFileSync(filePath, 'utf8');
        } catch (error) {
            // Handle file reading error
            throw error;
        }

        let value;
        // Perform analysis based on the specified task
        if (req.body.taskName.toLowerCase() === 'count words') {
            value = countWords.countWords(fileContent);
        }
        if (req.body.taskName.toLowerCase() === 'count unique words') {
            value = countUniqueWords.countUniqueWords(fileContent);
        }
        if (req.body.taskName.toLowerCase() === 'top k words') {
            // Validate required parameter for top k words task
            if (!req.body.k) {
                return res.status(400).send(`Parameter k is required. k is the number of top most frequent words in file.`);
            }
            value = topKWords.topKWords(fileContent, req.body.k);
        }

        // Use Prisma to create a new task with auto-incremented id
        const taskId = `task_${Date.now()}`;
        const taskName = req.body.taskName.toLowerCase() === "top k words" ? `top ${req.body.k} words` : req.body.taskName;

        // Create task record in the database
        const taskRecord = await fileModel.createTask(taskId, taskName, value.toString(), fileDetails.id);

        // Respond with the created task ID
        return res.send({ "TaskId": taskId });
    } catch (error) {
        // Log the error
        console.log(error);

        // Respond with a 500 Internal Server Error status
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    initiateAnalysis
};