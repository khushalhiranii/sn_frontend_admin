import React, { createContext, useState, useContext, useEffect } from 'react';

const DepositContext = createContext();

export const useDepositContext = () => useContext(DepositContext);

const DepositProvider = ({ children }) => {
  const [selectedScheme, setSelectedSchemeState] = useState(() => {
    try {
      const schemeType = sessionStorage.getItem('schemeType');
      return schemeType ? (schemeType) : null;
    } catch (error) {
      console.error("Failed to retrieve scheme from session storage", error);
      return null;
    }
  });

  const setSelectedScheme = (scheme) => {
    try {
      sessionStorage.setItem('schemeType', (scheme));
      setSelectedSchemeState(scheme);
    } catch (error) {
      console.error("Failed to set scheme in session storage", error);
    }
  };

  // const schemes = [
  //   { id: 1, type: 'Weekly Deposit', description: 'Deposit a fixed amount weekly.' },
  //   { id: 2, type: 'Recurring Deposit', description: 'Deposit a fixed sum at regular intervals.' },
  //   { id: 3, type: 'Monthly Deposit', description: 'Deposit a fixed amount monthly.' },
  //   { id: 4, type: 'Fixed Deposit', description: 'One-time lump sum investment for a fixed tenure.' }
  // ];

  // const applyForScheme = (scheme) => {
  //   setSelectedScheme(scheme);
  //   alert(`You have applied for the ${scheme.type}`);
  // };

  return (
    <DepositContext.Provider value={{ selectedScheme, setSelectedScheme }}>
      {children}
    </DepositContext.Provider>
  );
};

export default DepositProvider;
