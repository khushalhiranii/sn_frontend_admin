import React, { useEffect, useState } from 'react';
import InputComponent from '../../../../admin/components/InputComponent';
import { useUserSocket } from '../../../context/UserSocketContext';
import SavingAccHeader from '../../../DesignSystem/SavingAccHeader';
import { Navigate, useNavigate } from 'react-router-dom';
import RedButton from '../../../DesignSystem/RedButton';

function UserInfoPage() {
  const { user, userData, account, schemes, loans, requests, logout } = useUserSocket();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Correct use of useNavigate

  // Ensuring the arrays are defined, preventing issues with undefined/null values
  const schemesArray = schemes ? Object.values(schemes) : [];
  const loansArray = loans ? Object.values(loans) : [];
  const requestsArray = requests ? Object.values(requests) : [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  // Format date helper function
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  // Conditional rendering based on loading and user authentication state
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center mt-[16px]">
        <div className="spinner-border animate-spin rounded-full h-8 w-8 border-solid border-t-2 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!user || !account) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="flex flex-col items-center justify-center px-4 py-8 max-w-[calc(100%_-_128px)] gap-6 text-left font-inter min-h-screen">
        {/* Saving Account Header */}
        <div className="flex flex-col items-start justify-start gap-4 w-full">
          <SavingAccHeader />
        </div>

        {/* Government ID Details */}
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap">Government ID Details</div>
          <div className="grid grid-cols-4 w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label="Aadhaar" value={userData?.Aadhar_Number} />
            <InputComponent label="PAN" value={userData?.Pan_Number} />
            <InputComponent label="Voter ID" />
          </div>
        </div>

        {/* Employment ID Details */}
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap">Employment ID Details</div>
          <div className="grid grid-cols-4 w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label="Employment Type" value={userData?.Employment} />
            <InputComponent label="Company Name" />
            <InputComponent label="Employee ID" />
            <InputComponent label="Income" value={userData?.Salary} />
          </div>
        </div>

        {/* Display Pending Schemes */}
        {schemesArray.map((scheme, index) => (
          <div key={index} className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap">Scheme Details (Pending)</div>
            <div className=" grid grid-cols-4 w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
              <InputComponent label="Scheme Type" value={scheme.Type} />
              <InputComponent label="Applied Scheme" value={scheme.Income} />
              <InputComponent label="Deposit Amount" value={scheme.Amount} />
              <InputComponent label="Tenure" value={scheme.Tenure} />
              <InputComponent label="Rate of Interest" value={scheme.Interest} />
              <InputComponent label="Maturity Date" value={formatDate(scheme.Maturity)} />
            </div>
          </div>
        ))}

        {/* Display Pending Loans */}
        {loansArray.map((loan, index) => (
          <div key={index} className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap">Loan Details</div>
            <div className="grid grid-cols-4 w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
              <InputComponent label="Loan Type" value={loan.Type} />
              <InputComponent label="Loan Status" value={loan.Status} />
              <InputComponent label="Applied Loan" value={loan.Amount} />
              <InputComponent label="Purpose of Loan" value={loan.Purpose} />
              <InputComponent label="Rate of Interest" value={loan.Interest} />
              <InputComponent label="Due Amount" value={loan.Due} />
              <InputComponent label="Paid Amount" value={loan.Completed} />
            </div>

            {/* Conditional Display for Property Loans */}
            {loan.Type === 'Property' && (
              <div className="flex flex-col items-start justify-start gap-2 w-full">
                <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap">Property Details</div>
                <div className=" grid grid-cols-4 w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
                  <InputComponent label="Property Type" value={loan.Nature} />
                  <InputComponent label="Property Address" value={loan.Address} />
                  <InputComponent label="Property Value (On purchase)" value={loan.Value} />
                </div>
              </div>
            )}

            {/* Conditional Display for Business Loans */}
            {loan.Type === 'Business' && (
              <div className="flex flex-col items-start justify-start gap-2 w-full">
                <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap">Business Details</div>
                <div className="grid grid-cols-4 w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
                  <InputComponent label="Business Type" value={loan.Nature} />
                  <InputComponent label="Firm Name" value={loan.Name} />
                  <InputComponent label="Business Profit" value={loan.Profit} />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Display Pending Loan Requests */}
        {requestsArray.map((loan, index) => (
          <div key={index} className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap">Pending Loan Details</div>
            <div className="grid grid-cols-4 w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
              <InputComponent label="Loan Type" value={loan.Type} />
              <InputComponent label="Loan Status" value={loan.Status} />
              <InputComponent label="Applied Loan" value={loan.Amount} />
              <InputComponent label="Purpose of Loan" value={loan.Purpose} />
            </div>
          </div>
        ))}
        <div className='flex flex-row justify-center'>
          <RedButton label={"Log Out"} onClick={()=>{sessionStorage.clear(); logout(); navigate('/')}} />
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;
