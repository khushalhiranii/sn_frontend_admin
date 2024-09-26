import React from 'react';
import { useParams } from 'react-router-dom';
import InputComponent from '../../components/InputComponent';
import { useAdminSocket } from '../../context/AdminSocketContext';
import { getFullUrl } from '../../utils';
import Loader from '../../../LoadingIndicator/Loader';
import RedButton from '../../../user/DesignSystem/RedButton';

function CustomerInfoPage() {
  const { userId } = useParams(); // Get the userId from the URL
  const { users, userData, schemes, loans, accounts } = useAdminSocket();

  // Function to get and merge data
  const getMergedData = () => {
    const usersArray = Object.values(users);
    const userDataArray = Object.values(userData);
    const accountsArray = Object.values(accounts);

    // Ensure userId is defined and valid
    if (!userId) return null;

    // Find the user and userData by userId
    const filteredUser = usersArray.find((user) => user.Identifier === userId);
    const filteredUserData = userDataArray.find((data) => data.Identifier === userId);
    const filteredAccountData = accountsArray.find((account) => account.Identifier === userId);

    // Combine the data if both are available
    const mergedData = filteredUser && filteredUserData ? {
      ...filteredUser,
      ...filteredUserData,
      ...filteredAccountData,
    } : null;

    return mergedData;
  };

  // Filter schemes and loans with 'Pending' status corresponding to the userId
  const getPendingSchemes = () => {
    return Object.values(schemes).filter((scheme) => scheme.Identifier === userId && scheme.Status === "Pending");
  };

  const getPendingLoans = () => {
    return Object.values(loans).filter((loan) => loan.Identifier === userId && loan.Status === "Pending");
  };

  // Call the function to get the merged data
  let data;
  if (users) {
    data = getMergedData();
  }

  const pendingSchemes = getPendingSchemes();
  const pendingLoans = getPendingLoans();

  function calculateAge(dobString) {
    const dob = new Date(dobString);
    const now = new Date();
    
    if (isNaN(dob.getTime())) {
      throw new Error('Invalid date format');
    }
    
    let age = now.getFullYear() - dob.getFullYear();
    const monthDifference = now.getMonth() - dob.getMonth();
    const dayDifference = now.getDate() - dob.getDate();
    
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    
    return age;
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  if (!data) {
    return <Loader/>;
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
              src={getFullUrl(data.Photo)}
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

        {/* Government ID Details */}
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Government ID Details</div>
          <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Aadhaar"} value={data.Aadhar_Number} />
            <InputComponent label={"PAN"} value={data.Pan_Number} />
            <InputComponent label={"Voter ID"} />
          </div>
        </div>

        {/* Employment ID Details */}
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Employment ID Details</div>
          <div className="flex flex-row flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
          <InputComponent label={"Employment Type"} value={data.Employment}/>
            <InputComponent label={"Company Name"}/>
            <InputComponent label={"Employee ID"}/>
            <InputComponent label={"Income"} value={data.Salary}/>
          </div>
        </div>

        {/* Display Pending Schemes */}
        {pendingSchemes.map((scheme, index) => (
          <div key={index} className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Scheme Details (Pending)</div>
            <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
              <InputComponent label={"Scheme Type"} value={scheme.Type} />
              <InputComponent label={"Applied Scheme"} value={scheme.Income} />
              <InputComponent label={"Deposit Amount"} value={scheme.Amount} />
            </div>
            <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
              <InputComponent label={"Tenure"} value={scheme.Tenure} />
              <InputComponent label={"Rate of Interest"} value={scheme.Interest} />
              <InputComponent label={"Maturity Date"} value={formatDate(scheme.Maturity)} />
            </div>
          </div>
        ))}

        {/* Display Pending Loans */}
        {pendingLoans.map((loan, index) => (
          <div key={index} className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Loan Details</div>
            <div className="flex flex-row flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
              <InputComponent label={"Loan Type"} value={loan.Type} />
              <InputComponent label={"Loan Status"} value={loan.Status} />
              <InputComponent label={"Applied Loan"} value={loan.Amount} />
              <InputComponent label={"Purpose of Loan"} value={loan.Purpose} />
              <InputComponent label={"Rate of Interest"} value={loan.Interest} />
              <InputComponent label={"Due Amount"} value={loan.Due} />
              <InputComponent label={"Paid Amount"} value={loan.Completed} />
            </div>

            {/* Conditional Display for Property Loans */}
            {loan.Type === "Property" && (
              <div className="flex flex-col items-start justify-start gap-2 w-full">
                <div className="tracking-tight leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] text-[20px] mq450:leading-[1.5rem]">
                  Property Details
                </div>
                <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
                  <InputComponent label="Property Type" value={loan.Nature} />
                  <InputComponent label="Property Address" value={loan.Address} />
                  <InputComponent label="Property Value (On purchase)" value={loan.Value} />
                </div>
              </div>
            )}

            {/* Conditional Display for Business Loans */}
            {loan.Type === "Business" && (
              <div className="flex flex-col items-start justify-start gap-2 w-full">
                <div className="tracking-tight leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] text-[20px] mq450:leading-[1.5rem]">
                  Business Details
                </div>
                <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
                  <InputComponent label="Business Type" value={loan.Nature} />
                  <InputComponent label="Firm Name" value={loan.Name} />
                  <InputComponent label="Business Profit" value={loan.Profit} />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Additional Data for User */}
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Bank Details</div>
          <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Account No"} value={data.Account} />
            <InputComponent label={"IFSC Code"} />
            <InputComponent label={"Statement"} />
          </div>
        </div>

        

        

        {/* Nominee Details */}
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Nominee Details</div>
          <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Nominee Name"}  />
            <InputComponent label={"Nominee Relationship"}  />
            <InputComponent label={"Nominee Age"}  />
          </div>
        </div>

      </div>
    </div>
  );
}

export default CustomerInfoPage;
