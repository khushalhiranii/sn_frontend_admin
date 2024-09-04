// SchemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAdminSocket } from '../../context/AdminSocketContext';

const SchemeContext = createContext();

export const SchemeProvider = ({ children }) => {
  const { users, userData, schemes, accounts } = useAdminSocket();
  const [mergedAccounts, setMergedAccounts] = useState([]);
  const [selectedLoanType, setSelectedLoanType] = useState('Weekly');

  const getMergedData = () => {
    const usersArray = Object.values(users);
    const userDataArray = Object.values(userData);
    const schemesArray = Object.values(schemes);

    // Filter schemes by status and selectedLoanType
    const filteredSchemes = schemesArray.filter(
      (scheme) => scheme.Status === 'Pending' && scheme.Type === selectedLoanType
    );

    // Merge the data based on the "Identifier"
    const mergedData = filteredSchemes.map((scheme) => {
      const user = usersArray.find((u) => u.Identifier === scheme.Identifier);
      const data = userDataArray.find((d) => d.Identifier === scheme.Identifier);
      const mergedAddress = data ? Object.values(data.Address.Address).join(', ') : '';

      return {
        Scheme: { ...scheme },
        Name: user?.Name,
        Number: user?.Number,
        Address: mergedAddress,
        Photo: data?.Photo,
      };
    });

    setMergedAccounts(mergedData);
  };

  useEffect(() => {
    getMergedData();
  }, [users, userData, schemes, selectedLoanType]);

  return (
    <SchemeContext.Provider value={{ mergedAccounts, selectedLoanType, setSelectedLoanType, getMergedData }}>
      {children}
    </SchemeContext.Provider>
  );
};

export const useSchemeContext = () => useContext(SchemeContext);
