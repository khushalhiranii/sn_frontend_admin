import React, { createContext, useState, useContext } from 'react';
import { useAdminSocket } from '../../context/AdminSocketContext';

const LoanInfoContext = createContext();

export const useLoanInfoContext = () => useContext(LoanInfoContext);

const LoanInfoProvider = ({ children }) => {
  const { users, userData, accounts, loans } = useAdminSocket();
  const [selectedLoanType, setSelectedLoanType] = useState('Property'); // Initialize selectedLoanType state

  const getMergedData = () => {
    const usersArray = Object.values(users);
    const userDataArray = Object.values(userData);
    const loansArray = Object.values(loans);
    const accountsArray = Object.values(accounts);

    // Filter loans by status and selectedLoanType
    const filteredLoans = loansArray.filter(
      (loan) => loan.Status != 'Pending' && loan.Status != 'Rejected' && loan.Type === selectedLoanType
    );

    // Merge the data based on the "Identifier"
    const mergedData = filteredLoans.map((loan) => {
      const user = usersArray.find((u) => u.Identifier === loan.Identifier);
      const data = userDataArray.find((d) => d.Identifier === loan.Identifier);
      const account = accountsArray.find((a) => a.Identifier === loan.Identifier); // Corrected typo here

      // Merge addresses if there are multiple entries
      const mergedAddress = data ? Object.values(data.Address.Address).join(', ') : '';

      return {
        Loan: { ...loan }, // Include loan details
        User: { ...user },
        Data: { ...data },
        Account: { ...account },
        MergedAddress: mergedAddress,
      };
    });

    return mergedData;
  };

  const mergedData = getMergedData();

  return (
    <LoanInfoContext.Provider value={{ mergedData, selectedLoanType, setSelectedLoanType }}>
      {children}
    </LoanInfoContext.Provider>
  );
};

export default LoanInfoProvider;
