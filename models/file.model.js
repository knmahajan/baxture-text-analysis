// Import PrismaClient from the '@prisma/client' package
const { PrismaClient } = require('@prisma/client');

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

/**
 * Create a new file record in the database.
 * @param {string} fileId - The unique identifier for the file.
 * @param {string} filename - The name of the uploaded file.
 * @returns {Promise} A promise that resolves to the created file record.
 */
async function createFile(fileId, filename) {
    try {
        // Use Prisma to create a new file record in the database
        const fileRecord = await prisma.file.create({
            data: {
                fileId: fileId,
                filename: filename,
            },
        });

        return fileRecord;
    } catch (error) {
        // Handle any errors that occur during the database operation
        throw error; // Rethrow the error for the calling function to handle
    }
}

/**
 * Retrieve file details from the database based on fileId.
 * @param {string} fileId - The unique identifier for the file.
 * @returns {Promise} A promise that resolves to the file details.
 */
async function getFile(fileId) {
    try {
        const fileDetails = await prisma.file.findFirst({
            where: {
                fileId: fileId,
            },
        });
        return fileDetails;
    } catch (error) {
        // Handle any errors that occur during the database operation
        throw error; // Rethrow the error for the calling function to handle
    }
}

/**
 * Create a new task record in the database.
 * @param {string} taskId - The unique identifier for the task.
 * @param {string} taskName - The name of the task.
 * @param {string} value - The value associated with the task.
 * @param {number} fileId - The ID of the associated file.
 * @returns {Promise} A promise that resolves to the created task record.
 */
async function createTask(taskId, taskName, value, fileId) {
    try {
        return prisma.task.create({
            data: {
                taskId: taskId,
                taskName: taskName,
                value: value,
                file: {
                    connect: { id: fileId }
                },
            },
        });
    } catch (error) {
        // Handle any errors that occur during the database operation
        throw error; // Rethrow the error for the calling function to handle
    }
}

/**
 * Retrieve task details from the database based on taskId.
 * @param {string} taskId - The unique identifier for the task.
 * @returns {Promise} A promise that resolves to the task details.
 */
async function getTask(taskId) {
    try {
        // Use Prisma to find the first task record in the database
        const taskDetails = await prisma.task.findFirst({
            where: {
                taskId: taskId,
            },
        });

        return taskDetails;
    } catch (error) {
        // Handle any errors that occur during the database operation
        throw error; // Rethrow the error for the calling function to handle
    }
}


module.exports = {
    createFile,
    getFile,
    createTask,
    getTask
};