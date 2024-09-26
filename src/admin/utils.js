// utils.js
import React, { useState, useEffect } from 'react';

// utils.js

/**
 * Constructs a full URL with the base URL and a provided filename.
 * @param {string} filename - The name of the file to append to the base URL.
 * @returns {string} The full URL.
 */
export const getFullUrl = (filename) => {
    const baseUrl = 'https://subandhan.nidhi.blazearcs.space/'; // Base URL
  
    // if (!filename) {
    //   // throw new Error('Filename is required'); // Error handling if filename is not provided

    // }
  
    return `${baseUrl}${filename}`; // Return the full URL
  };

// Component for displaying the loader
// function FileLoader({ filename }) {
//     const [loading, setLoading] = useState(true);
//     const [fileUrl, setFileUrl] = useState(null);

//     useEffect(() => {
//         const fetchUrl = async () => {
//             try {
//                 const url = await getFullUrl(filename);
//                 setFileUrl(url);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUrl();
//     }, [filename]);

//     return (
//         <div className="w-full h-full flex items-center justify-center">
//             {loading ? (
//                 <div className="flex flex-col items-center justify-center">
//                     {/* Attractive loading spinner */}
//                     <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
//                     <p className="mt-2 text-gray-500">Loading...</p>
//                 </div>
//             ) : (
//                 <div className="w-full h-full flex items-center justify-center">
//                     {/* Display the file URL or your content */}
//                     <a href={fileUrl} className="text-blue-500 underline">
//                         View File
//                     </a>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default FileLoader;
