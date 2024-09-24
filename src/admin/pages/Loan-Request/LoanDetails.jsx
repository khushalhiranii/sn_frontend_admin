import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../axiosSetup';
import InputComponent from '../../components/InputComponent';
import RedButton from '../../../user/DesignSystem/RedButton';
import OutlinedButton from '../../components/OutlinedButton';
import { useAdminSocket } from '../../context/AdminSocketContext';
import { getFullUrl } from '../../utils';
import axiosInstance from '../../../../axios.utils';

function LoanDetails() {
  const { userId, loanId } = useParams(); // Get the userId from the URL
  const { users, userData, accounts, requests, products } = useAdminSocket();
  const [approvedDetails, setApprovedDetails] = useState({"Loan": loanId});
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const productsArray = Object.values(products);
  console.log(productsArray)

// Handle checkbox selection
const handleSelectChange = (e) => {
  const value = e.target.value;

  setSelected((prevSelected) =>
    prevSelected.includes(value)
      ? prevSelected.filter((item) => item !== value) // Deselect if already selected
      : [...prevSelected, value] // Select if not already selected
  );
  
};


  const OfferLoan = async () => {
    try {
      console.log(approvedDetails)
      console.log(selected)
      const response = await axiosInstance.put('/admin/classic/Offers',{
        "data" : {
        "Request": loanId ,
        "Products": selected
    }
      })
      if(response.status == 200){
        alert("Loan Offered")
      }
      
    } catch (error) {
      console.error("Request failed: ", error)
    }
  }

  const deny = async () => {
    try {
      const response = await axiosInstance.put('admin/classic/Reject', {
        "data" : {
            "Request":id
        }
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const approve = async () => {
    try {
      const response = await axiosInstance.post('admin/classic/Create-Loan', {
        "data" : {
            "Request":id
        }
      })
      console.log(response)
    } catch (error) {
      console.error(error)
      alert("Customer didn't accept the offer")
    }
  }

  console.log(users)
  console.log(userData)
  

  // Function to get and merge data
  const getMergedData = () => {
    const usersArray = Object.values(users);
    const userDataArray = Object.values(userData);
    const requestsArray = Object.values(requests);
    const accountsArray = Object.values(accounts);

    console.log(usersArray)

    // Ensure userId is defined and valid
    if (!userId) return null;

    // Find the user and userData by userId
    const filteredUser = usersArray.find((user) => user.Identifier === userId);
    const filteredUserData = userDataArray.find((data) => data.Identifier === userId);
    const filteredLoanData = requestsArray.find((loan)=> loan.Identifier === userId && loan.Request === loanId)
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
        Offer Products
      </div>
      <div>
        {productsArray.map((product) => (
          <div key={product.Product}>
            <label className="flex items-center gap-2 cursor-pointer text-black hover:bg-blue-100 p-2 rounded">
              <input
                type="checkbox"
                value={product.Product}
                checked={data?.loanInfo?.Products?.includes(product.Product)}
                onChange={handleSelectChange}
              />
              Amount: {product.Amount}, 
              Emi: {product.Emi}, 
              Interest: {product.Interest}, 
              Mode: {product.Mode}, 
              Product: {product.Product}, 
              Tenure: {product.Tenure}, 
              Type: {product.Type}
            </label>
          </div>
        ))}
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
        <OutlinedButton label="Cancel" onClick={()=>navigate('/admin/loanRequest')} />
        
          <RedButton label="Approve" onClick={()=>approve()} />
        </div>
      </div>
    </div>
  );
}

export default LoanDetails;
