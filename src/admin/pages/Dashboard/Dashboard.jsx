import React, { useState } from 'react';
import Loan from './loan';
import { useAdminSocket } from '../../context/AdminSocketContext';
import ApprovedLoans from '../Loan-Info/ApprovedLoans';
import Loader from '../../../LoadingIndicator/Loader';

function Dashboard() {
  // Set the default state to 'Property Loan'
  const [selectedLoanType, setSelectedLoanType] = useState('Property'); // Default type
  const { users, userData, loans, schemes, accounts, requests } = useAdminSocket();

  const handleButtonClick = (loanType) => {
    setSelectedLoanType(loanType);
  };

  const usersArray = Object.values(users);
  const userDataArray = Object.values(userData);
  const loansArray = Object.values(requests);
  const schemesArray = Object.values(schemes);
  const accountsArray = Object.values(accounts);

  const filteredLoansLength = loansArray.filter(
    (loan) => loan.Status === 'Pending' || loan.Status ==='Offered' || loan.Status ==='Accepted' ).length;

  const filteredDueLoansLength = loansArray.filter(
    (loan) => loan.Status === 'Active').length;

  const filteredSchemesLength = schemesArray.filter(
    (loan) => loan.Status === 'Pending').length;

  const filteredAccountsLength = accountsArray.filter(
    (loan) => loan.Status != 'Pending' && loan.Status != 'Rejected').length;

  const getCurrentDate = () => {
    const date = new Date();
      
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based index) and pad with leading zero
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year
    
    return `${day}/${month}/${year}`; // Combine day, month, and year
  };


  const getMergedData = () => {
    

    // Filter loans by status and selectedLoanType
    const filteredLoans = loansArray.filter(
      (loan) => loan.Status != 'Pending' && loan.Status != 'Rejected' && loan.Type === selectedLoanType
    );

    // Merge the data based on the "Identifier"
    const mergedData = filteredLoans.map((loan) => {
      const user = usersArray.find((u) => u.Identifier === loan.Identifier);
      const data = userDataArray.find((d) => d.Identifier === loan.Identifier);

      // Merge addresses if there are multiple entries
      const mergedAddress = data ? Object.values(data.Address.Address).join(', ') : '';

      return {
        ...loan, // Include loan details
        Name: user?.Name,
        Number: user?.Number,
        Address: mergedAddress,
        Photo: data?.Photo,
      };
    });

    return mergedData;
  };

  // Get filtered and merged data
  const mergedAccounts = getMergedData();
  console.log(mergedAccounts)

  if(!users){
    return(
      <Loader/>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-start justify-start pt-[2rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_344px)] text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="self-stretch flex flex-col items-start justify-start gap-[1.937rem] max-w-full shrink-0 mq675:gap-[0.938rem]">
        <div className="w-[17.25rem] flex flex-row items-start justify-start relative shrink-0 text-[0.813rem] font-inter">
          <div className="flex-1 rounded bg-foundation-red-normal flex flex-col items-start justify-start p-[0.5rem] gap-[0.5rem] z-[1]">
            <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[3.688rem]">
              {getCurrentDate()}
            </a>
            <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem] text-[1.25rem] font-roboto">
              <div className="flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem]">
                <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[7.813rem] mq450:text-[1rem]">
                  Today’s Tasks
                </a>
              </div>
              <div className="h-[1.5rem] w-[1.5rem] relative bg-gainsboro" />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between gap-[2rem] shrink-0 text-black1 mq675:gap-[1rem] mq750:flex-wrap">
          <Loan home22="/loan.svg" loanRequests="Loan Requests" count={filteredLoansLength} />
          <Loan home22="/schemes.svg" loanRequests="Scheme Request" count={filteredSchemesLength}/>
          <Loan home22="/due-loan.svg" loanRequests="Due Loans" count={filteredDueLoansLength} />
          <Loan home22="/sav-acc.svg" loanRequests="Saving Account" count={filteredAccountsLength} />
        </div>
      </div>
      <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
        <ApprovedLoans />
      </div>
    </div>
  );
}

export default Dashboard;