/**
 * Count the number of words in a given input string.
 * @param {string} inputString - The input string to count words from.
 * @returns {number} The count of words in the input string.
 */
const countWords = (inputString) => {
    // Split the input string into an array of words using regular expression (whitespace as separator)
    const words = inputString.split(/\s+/);

    // Return the length of the array, representing the count of words
    return words.length;
}

module.exports = {
    countWords
};
