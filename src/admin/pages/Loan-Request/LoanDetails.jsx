import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../axiosSetup';
import InputComponent from '../../components/InputComponent';
import RedButton from '../../../user/DesignSystem/RedButton';
import OutlinedButton from '../../components/OutlinedButton';

function LoanDetails() {
//   const { userId } = useParams(); // Get the userId from the URL
//   const [user, setUser] = useState(null); // Initial state should be null or an empty object
//   const axios = useAxios();

//   function calculateAge(dobString) {
//     const dob = new Date(dobString);
//     const now = new Date();
  
//     let age = now.getFullYear() - dob.getFullYear();
//     const monthDifference = now.getMonth() - dob.getMonth();
//     const dayDifference = now.getDate() - dob.getDate();
  
//     // Adjust the age if the current date is before the birthday in the current year
//     if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
//       age--;
//     }
  
//     return age;
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`https://sn-backend.vercel.app/api/v1/admin/user/${userId}`);
//         const user = res.data.data;
//         setUser(user);
//         console.log(user);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [userId]); // Re-run the effect if userId changes

//   if (!user) {
//     return <div>Loading...</div>;
//   }

  return (
    <div className="overflow-y-auto flex flex-col items-start justify-start px-4 py-8 max-w-[calc(100%_-_344px)] text-left text-white font-inter mq850:max-w-full">
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        <div className="flex flex-col items-start justify-start gap-4 w-full">
          <div className="flex flex-row flex-wrap items-center justify-start py-4 pr-[49.312rem] pl-4 gap-4 bg-[#F5F5F5] rounded-lg text-black font-roboto mq450:pr-5 mq725:pr-[12.313rem] mq1025:pr-[24.625rem]">
            <img
              className="h-[5rem] w-[5rem] rounded-lg object-cover"
              loading="lazy"
              alt=""
              src='/default-profile.png' // Provide a fallback image
            />
            <div className="flex-1 flex flex-col items-start justify-start gap-2 min-w-[5.063rem]">
              <div className="font-medium min-w-[6.5rem] mq450:text-[1rem]">
                Fullname | Age
              </div>
              <div className="text-[1rem] font-medium min-w-[7.813rem]">
                Phoneno | email
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
            <InputComponent label={"PAN No"}/>
            <InputComponent label={"Aadhar No"}/>
            <InputComponent label={"Voter ID"}/>
              
              
            </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Employment ID's Details</div>
            <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Employment Type"}/>
            <InputComponent label={"Company Name"}/>
            <InputComponent label={"Employee ID"}/>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Applied Loan Details</div>
            <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Loan Type"}/>
            <InputComponent label={"Applied Loan"}/>
            <InputComponent label={"Purpose of Loan"}/>
            </div>
            
          
        </div>
        <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] text-[20px] mq450:leading-[1.5rem]">Property Details</div>
            <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label={"Property Type"}/>
            <InputComponent label={"Property Address"}/>
            <InputComponent label={"Property Value (On purchase)"}/>
            </div>
              <div className="flex flex-row w-full items-start justify-self-start gap-4 text-[1rem] text-gray-400 font-roboto">
              <InputComponent label={"Date of Purchase"}/>
              <InputComponent label={"Document of Purchase"}/>
              </div>
            
            
          
        </div>
        <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight text-[20px] leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Bank Details</div>
            <div className="flex flex-row w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
              <InputComponent label={"Account No"}/>
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
        <OutlinedButton label={"Cancel"} />
          <RedButton label={"Approve"}/>
        </div>
      </div>
    </div>
  );
}

export default LoanDetails;
