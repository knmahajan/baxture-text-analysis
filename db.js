// Import PrismaClient from the '@prisma/client' package
const { PrismaClient } = require('@prisma/client');

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

module.exports = prisma;