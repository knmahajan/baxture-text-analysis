const fileModel = require('../models/file.model');

/**
 * Function to retrieve the task analysis result based on taskId
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const retrieveAnalysis = async (req, res) => {
    try {
        // Validate required parameters
        if (!req.body.taskId) {
            return res.status(400).send("Parameter taskId is required.")
        }

        // Retrieve task details using taskId
        const taskDetails = await fileModel.getTask(req.body.taskId);

        // Respond with the task asnalysis result
        res.send({
            "taskName": taskDetails.taskName,
            "taskResult": taskDetails.value
        })
    } catch (error) {
        // Respond with a 500 Internal Server Error status
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    retrieveAnalysis
};