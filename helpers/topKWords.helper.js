/**
 * Get the top K words and their frequencies from a given input string.
 * @param {string} inputString - The input string to analyze.
 * @param {number} k - The number of top words to retrieve.
 * @returns {Array} An array containing the top K words and their frequencies.
 */
const topKWords = (inputString, k) => {
    // Split the input string into an array of words using regular expression (whitespace as separator)
    const words = inputString.split(/\s+/);

    // Object to store word frequencies
    const wordFrequency = {};

    // Count word frequency
    words.forEach((word) => {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    // Sort words by frequency in descending order
    const sortedWords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);

    // Get the top K words
    const topK = sortedWords.slice(0, k);

    // Map top K words to objects containing word and frequency
    return topK;
}

module.exports = {
    topKWords
};