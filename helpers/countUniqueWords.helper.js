/**
 * Count the number of unique words in a given input string.
 * @param {string} inputString - The input string to count unique words from.
 * @returns {number} The count of unique words in the input string.
 */
const countUniqueWords = (inputString) => {
    // Split the input string into an array of words using regular expression (whitespace as separator)
    const words = inputString.split(/\s+/);

    // Create a Set from the array to automatically eliminate duplicates and get unique words
    const uniqueWords = new Set(words);

    // Return the size of the Set, representing the count of unique words
    return uniqueWords.size;
}

module.exports = {
    countUniqueWords
};
