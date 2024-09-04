// utils.js

/**
 * Constructs a full URL with the base URL and a provided filename.
 * @param {string} filename - The name of the file to append to the base URL.
 * @returns {string} The full URL.
 */
export const getFullUrl = (filename) => {
    const baseUrl = 'https://subandhan.nidhi.blazearcs.space/'; // Base URL
  
    if (!filename) {
      throw new Error('Filename is required'); // Error handling if filename is not provided
    }
  
    return `${baseUrl}${filename}`; // Return the full URL
  };
  