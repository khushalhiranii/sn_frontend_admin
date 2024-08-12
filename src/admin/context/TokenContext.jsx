// // TokenContext.jsx
// import React, { createContext, useState, useContext } from 'react';
// import { AuthProvider } from './AuthContext';

// const TokenContext = createContext();

// export const TokenProvider = ({ children }) => {
//     const [token, setToken] = useState(null);

//     return (
//         <TokenContext.Provider value={{ token, setToken }}>
//             <AuthProvider>
//                 {children}
//             </AuthProvider>
//         </TokenContext.Provider>
//     );
// };

// export const useToken = () => useContext(TokenContext);
