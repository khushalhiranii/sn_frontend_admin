import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../axiosSetup';
import InputComponent from '../../components/InputComponent';
import RedButton from '../../../user/DesignSystem/RedButton';
import OutlinedButton from '../../components/OutlinedButton';
import { useAdminSocket } from '../../context/AdminSocketContext';
import { getFullUrl } from '../../utils';
import axiosInstance from '../../../../axios.utils';

function LoanDetails() {
  const { userId, loanId } = useParams(); // Get the userId from the URL
  const { users, userData, loans, accounts } = useAdminSocket();
  const [approvedDetails, setApprovedDetails] = useState({"Loan": loanId});

  const appendApprovedDetails = (key, value) => {
    setApprovedDetails({
      ...approvedDetails,
      [key]: value,
    });
  };

  const OfferLoan = async () => {
    try {
      console.log(approvedDetails)
      const response = await axiosInstance.put('/admin/classic/Loan/Details',{
        "data": approvedDetails
      })
      if(response.status == 200){
        alert("Loan Offered")
      }
      
    } catch (error) {
      console.error("Request failed: ", error)
    }
  }

  const approve = async (action) => {
    try {
      const response = await axiosInstance.put('admin/classic/Loan', {
        "data" : {
            "Status" : action, //[ "Active" , "Closed" , "Rejected" , "Overdue" ]
            "Loan" : loanId
        }
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  console.log(users)
  console.log(userData)
  

  // Function to get and merge data
  const getMergedData = () => {
    const usersArray = Object.values(users);
    const userDataArray = Object.values(userData);
    const loansArray = Object.values(loans);
    const accountsArray = Object.values(accounts);

    console.log(usersArray)

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
  if(users){
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
  
  // async function approve(){
  //   try {
  //     const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/user/account/requests/${userId}`);
  //     const user = res.data.data;
  //     console.log(user);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  

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
                {data.Name} | {calculateAge(data.Birth)}
              </div>
              <div className="text-[1rem] font-medium min-w-[7.813rem]">
              {data.Number} | {data.Mail}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-start p-4 gap-8 w-full">
          <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight text-[20px] text-slate-800 leading-[150%] font-semibold min-w-[4.875rem] mq450:text-[1rem] mq450:leading-[1.5rem]">
              Government ID's Details
            </div>
            <div className="flex flex-row items-start justify-between gap-4 w-full text-[1rem] text-gray-400 font-roboto ">
            <InputComponent label={"PAN No"} value={data.Pan_Number}/>
            <InputComponent label={"Aadhar No"} value={data.Aadhar_Number}/>
            <InputComponent label={"Voter ID"}/>
              
              
            </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Employment ID's Details</div>
            <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Employment Type"} value={data.Employment}/>
            <InputComponent label={"Company Name"}/>
            <InputComponent label={"Employee ID"}/>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Applied Loan Details</div>
            <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Loan Type"}  value={data.loanInfo.Type}/>
            <InputComponent label={"Applied Loan"} value={data.loanInfo.Amount}/>
            <InputComponent label={"Purpose of Loan"} value={data.loanInfo.Purpose}/>
            </div>
            
          
        </div>
        {data.loanInfo.Type === "Property" && (
  <div className="flex flex-col items-start justify-start gap-2 w-full">
    {/* Header for Property Details */}
    <div className="tracking-tight leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] text-[20px] mq450:leading-[1.5rem]">
      Property Details
    </div>
    
    {/* Inputs for Property Information */}
    <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
      <InputComponent label="Property Type" value={data.loanInfo.Nature} />
      <InputComponent label="Property Address" value={data.loanInfo.Address} />
      <InputComponent label="Property Value (On purchase)" value={data.loanInfo.Value}/>
    </div>

    {/* Inputs for Purchase Information */}
    <div className="flex flex-row w-full items-start justify-self-start gap-4 text-[1rem] text-gray-400 font-roboto">
      <InputComponent label="Date of Purchase" />
      <InputComponent label="Document of Purchase" />
    </div>
  </div>
)}

      {data.loanInfo.Type === "Business" && (
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <div className="tracking-tight leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] text-[20px] mq450:leading-[1.5rem]">
            Business Details
          </div>
          
          {/* Inputs for Property Information */}
          <div className="flex flex-row flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
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
      <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">
        Approved Loan Details
      </div>

      <div className="flex flex-row flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
        {/* Input Components for Amount, Interest Rate, and Tenure */}
        <InputComponent
          label={"Amount"}
          value={approvedDetails?.Amount || ''}
          onChange={(e) => appendApprovedDetails('Amount', e.target.value)}
        />

        <InputComponent
          label={"Interest Rate"}
          value={approvedDetails?.Interest || ''}
          onChange={(e) => appendApprovedDetails('Interest', e.target.value)}
        />

        <InputComponent
          label={"Tenure"}
          value={approvedDetails?.Tenure || ''}
          onChange={(e) => appendApprovedDetails('Tenure', e.target.value)}
        />

        {/* Dropdown for Loan Type */}
        <div className="flex flex-col w-[333px] box-border items-start justify-normal p-1 gap-2">
          <div className="tracking-tight text-[14px] leading-[150%] font-medium min-w-[6.438rem]">
            Interest Type
          </div>

          <select
            className="w-full box-border outline-none text-[1rem] placeholder:text-black1 font-medium border-[#E3E3E3] rounded-[4px] border-[1px] border-solid p-[12px] bg-white"
            value={approvedDetails?.LoanType || ''}
            onChange={(e) => appendApprovedDetails('LoanType', e.target.value)}
          >
            <option value="" disabled>Select Option</option>
            <option value="Reducing">Reducing</option>
            <option value="Flat">Flat</option>
          </select>
        </div>
        
      </div>
      <div className='flex flex-row w-full items-end justify-end'>
        <RedButton label="Offer a Loan" onClick={()=>OfferLoan()} />
      </div>
    </div>
        
            
            
          
        
        <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight text-[20px] leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Bank Details</div>
            <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
              <InputComponent label={"Account No"} value={data.Account}/>
              <InputComponent label={"IFSC Code"}/>
              <InputComponent label={"Statement (last 6 months)"}/>
            </div>
            
          
        </div>
        <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap text-[20px] mq450:text-[1rem] mq450:leading-[1.5rem]">Guarantor Details</div>
            <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Name"}/>
            <InputComponent label={"Account No(in Subandhan Nidhi)"}/>
            <InputComponent label={"Phone No"}/>
            </div>
            <div className="flex flex-row w-full items-start justify-self-start gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Aadhar No"}/>
              </div>
            
          
        </div>
        </div>
        
        <div className="flex flex-row w-full items-end justify-end gap-6 text-[1rem] text-foundation-red-normal font-roboto">
        <OutlinedButton label="Cancel" onClick={()=>approve("Rejected")} />
        
          <RedButton label="Approve" onClick={()=>approve("Active")} />
        </div>
      </div>
    </div>
  );
}

export default LoanDetails;
