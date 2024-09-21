import React, { createContext, useState, useContext, useEffect } from 'react';

const LoanContext = createContext();

export const useLoanContext = () => useContext(LoanContext);

const LoanProvider = ({ children }) => {
  const [selectedLoan, setSelectedLoanState] = useState(() => {
    try {
      const loanType = sessionStorage.getItem('loanType');
      return loanType ? (loanType) : null;
    } catch (error) {
      console.error("Failed to retrieve loan from session storage", error);
      return null;
    }
  });

  const setSelectedLoan = (loan) => {
    try {
        console.log("Hi")
      sessionStorage.setItem('loanType', (loan));
      console.log("Hello")
      setSelectedLoanState(loan);
    } catch (error) {
      console.error("Failed to set loan in session storage", error);
    }
  };

  const loans = [
    { id: 1, type: 'Personal' },
    { id: 2, type: 'Instant' },
    { id: 3, type: 'Property' },
    { id: 4, type: 'Business' },
    { id: 5, type: 'Micro Finance' }
  ];

  const applyForLoan = (loan) => {
    setSelectedLoan(loan);
    alert(`You have applied for the ${loan.type}`);
  };

  return (
    <LoanContext.Provider value={{ loans, selectedLoan, setSelectedLoan, applyForLoan }}>
      {children}
    </LoanContext.Provider>
  );
};

export default LoanProvider;
