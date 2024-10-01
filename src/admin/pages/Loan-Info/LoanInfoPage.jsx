
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../axiosSetup';
import InputComponent from '../../components/InputComponent';
import RedButton from '../../../user/DesignSystem/RedButton';
import OutlinedButton from '../../components/OutlinedButton';
import { useAdminSocket } from '../../context/AdminSocketContext';
import { getFullUrl } from '../../utils';
import axiosInstance from '../../../../axios.utils';

function LoanInfoPage() {
  const { userId, loanId } = useParams(); // Get the userId from the URL
  const { users, userData, accounts, loans } = useAdminSocket();
  const navigate = useNavigate();


  const onViewClick = (url) => {
    const fileurl = getFullUrl(url)
    window.open(fileurl, '_blank'); // Opens the file in a new tab
  };
  

  
  

  // Function to get and merge data
  const getMergedData = () => {
    const usersArray = Object.values(users);
    const userDataArray = Object.values(userData);
    const loansArray = Object.values(loans);
    const accountsArray = Object.values(accounts);


    // Ensure userId is defined and valid
    if (!userId) return null;

    // Find the user and userData by userId
    const filteredUser = usersArray.find((user) => user.Identifier === userId);
    const filteredUserData = userDataArray.find((data) => data.Identifier === userId);
    const filteredLoanData = loansArray.find((loan)=> loan.Identifier === userId && loan.Loan === loanId)
    const filteredAccountData = accountsArray.find((account) => account.Identifier === userId);
    // Combine the data if both are available
    const mergedData = filteredUser && filteredUserData && filteredLoanData ? {
      ...filteredUser,
      ...filteredUserData,
      ...filteredAccountData,
      loanInfo:{...filteredLoanData} // This merges all properties from filteredUserData
    } : null;

    return mergedData;
  };

  // Call the function to get the merged data
  let data;
  if(users.length != 0){
    data = getMergedData();
  }
  
  console.log(data);
  function calculateAge(dobString) {
    // Parse the date string into a Date object
    const dob = new Date(dobString);
    const now = new Date();
    
    // Check if the date string is valid
    if (isNaN(dob.getTime())) {
      throw new Error('Invalid date format');
    }
    
    let age = now.getFullYear() - dob.getFullYear();
    const monthDifference = now.getMonth() - dob.getMonth();
    const dayDifference = now.getDate() - dob.getDate();
    
    // Adjust the age if the current date is before the birthday in the current year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    
    return age;
  }

  

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-y-auto flex flex-col items-start justify-start px-4 py-8 w-[calc(100%_-_344px)] text-left text-white font-inter mq850:max-w-full">
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        <div className="flex flex-col items-start justify-start gap-4 w-full">
          <div className="flex flex-row flex-wrap items-center justify-start py-4 pl-4 w-full gap-4 bg-[#F5F5F5] rounded-lg text-black font-roboto mq450:pr-5 mq725:pr-[12.313rem] mq1025:pr-[24.625rem]">
            <img
              className="h-[5rem] w-[5rem] rounded-lg object-cover"
              loading="lazy"
              alt=""
              src={getFullUrl(data?.Photo)} // Provide a fallback image
            />
            <div className="flex-1 flex flex-col items-start justify-start gap-2 min-w-[5.063rem]">
              <div className="font-medium min-w-[6.5rem] mq450:text-[1rem]">
                {data?.Name} | {calculateAge(data?.Birth)}
              </div>
              <div className="text-[1rem] font-medium min-w-[7.813rem]">
              {data?.Number} | {data?.Mail}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-start p-4 gap-8 w-full">
          <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight text-[20px] text-slate-800 leading-[150%] font-semibold min-w-[4.875rem] mq450:text-[1rem] mq450:leading-[1.5rem]">
              Government ID's Details
            </div>
            <div className="flex flex-wap items-start justify-between gap-4 w-full text-[1rem] text-gray-400 font-roboto ">
            <InputComponent label={"PAN No"} value={data.Pan_Number}/>
            <InputComponent label={"Aadhar No"} value={data.Aadhar_Number}/>
            <InputComponent label={"Voter ID"}/>
              
              
            </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Employment ID's Details</div>
            <div className="flex flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Employment Type"} value={data.Employment}/>
            <InputComponent label={"Income"} value={data.Salary}/>
            <InputComponent label={"Employee ID"}/>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Loan Details</div>
            <div className="flex flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Loan Type"}  value={data.loanInfo.Type}/>
            <InputComponent label={"Loan Amount"} value={data.loanInfo.Amount}/>
            <InputComponent label={"Loan Id"} value={data.loanInfo.Loan}/>
            <InputComponent label={"Purpose of Loan"} value={data.loanInfo.Purpose}/>
            <InputComponent label={"Interest Rate"} value={data.loanInfo.Interest}/>
            <InputComponent label={"Mode"} value={data.loanInfo.Mode}/>
            <InputComponent label={"EMI"} value={data.loanInfo.Emi}/>
            <InputComponent label={"Date of fulfilment"} value={data.loanInfo.Fullfilment}/>
            <InputComponent label={"Next Installment Due on"} value={data.loanInfo.Installment}/>
            <InputComponent label={"Tenure in weeks"} value={data.loanInfo.Tenure}/>
            
            </div>
            
          
        </div>
        {data.loanInfo.Type === "Property" && (
  <div className="flex flex-col items-start justify-start gap-2 w-full">
    {/* Header for Property Details */}
    <div className="tracking-tight leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] text-[20px] mq450:leading-[1.5rem]">
      Property Details
    </div>
    
    {/* Inputs for Property Information */}
    <div className="flex flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
      <InputComponent label="Property Type" value={data.loanInfo.Nature} />
      <InputComponent label="Property Address" value={data.loanInfo.Address} />
      <InputComponent label="Property Value (On purchase)" value={data.loanInfo.Value}/>
      <InputComponent label="Date of Purchase" value={data.loanInfo.Purchased}/>
      <InputComponent label="Verification by Agent" value={data.loanInfo.Verification}/>
      <InputComponent label="Document of Purchase" />
      <div className="flex flex-col w-[333px] box-border items-start justify-normal p-1 gap-2">
        <div className="tracking-tight text-[14px] leading-[150%] font-medium min-w-[6.438rem]">
          Document of Purchase
        </div>
        {/* <input
          className="w-full box-border outline-none text-[1rem] placeholder:text-black1 font-medium border-[#E3E3E3] rounded-[4px] border-[1px] border-solid p-[12px]"
          placeholder="Value"
          type="text"
          value={value}
          onChange={onChange}
        /> */}
        
        <button
          className="w-full box-border outline-none text-[1rem] font-medium border-[#E3E3E3] rounded-[4px] border-[1px] border-solid p-[12px] text-center bg-white hover:bg-blue-200"
          onClick={()=>onViewClick(data.loanInfo.Document)}
        >
          View
        </button>
      </div>

    </div>

    {/* Inputs for Purchase Information */}
    
  </div>
)}

      {data.loanInfo.Type === "Business" && (
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <div className="tracking-tight leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] text-[20px] mq450:leading-[1.5rem]">
            Business Details
          </div>
          
          {/* Inputs for Property Information */}
          <div className="flex flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label="Business Type" value={data.loanInfo.Nature} />
            <InputComponent label="Firm Name" value={data.loanInfo.Name} />
            <InputComponent label="Business Profit" value={data.loanInfo.Profit}/>
            <InputComponent label="Udhyam" value={data.loanInfo.Udhyam}/>
            <InputComponent label="GST" value={data.loanInfo.Gst}/>
          </div>

          {/* Inputs for Purchase Information */}
          <div className="flex flex-row w-full items-start justify-self-start gap-4 text-[1rem] text-gray-400 font-roboto">
            
          </div>
        </div>
      )}
        <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight text-[20px] leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Bank Details</div>
            <div className="flex flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
              <InputComponent label={"Account No"} value={data.Account}/>
              <InputComponent label={"IFSC Code"}/>
              <InputComponent label={"Statement (last 6 months)"}/>
            </div>
            
          
        </div>
        {data.loanInfo?.Guarantor && (<div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap text-[20px] mq450:text-[1rem] mq450:leading-[1.5rem]">Guarantor Details</div>
            <div className="flex flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Name"} value={data.loanInfo?.Guarantor[0]?.Name || "Value"}/>
            <InputComponent label={"Mail"} value={data.loanInfo?.Guarantor[0]?.Mail || "Value"}/>
            <InputComponent label={"Phone"} value={data.loanInfo?.Guarantor[0]?.Phone || "Value"}/>
            <InputComponent label={"PAN Number"} value={data.loanInfo?.Guarantor[0]?.Pan || "Value"}/>
            
            <InputComponent label={"Relation"} value={data.loanInfo.Guarantor[0]?.Relation || "Value"}/>
            <InputComponent label={"Address"} value={data.loanInfo.Guarantor[0]?.Address || "Value"}/>
              </div>
            
          
        </div>)}
        </div>
      </div>
    </div>
  );
}

export default LoanInfoPage;
