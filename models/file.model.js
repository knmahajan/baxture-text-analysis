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

module.exports = {
    createFile,
};