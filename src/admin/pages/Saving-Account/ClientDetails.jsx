import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAdminSocket } from '../../context/AdminSocketContext';
import { getFullUrl } from '../../utils';
import axiosInstance from '../../../../axios.utils';

function ClientDetails() {
  const { userId } = useParams(); // Get the userId from the URL
  const { users, userData, accounts } = useAdminSocket();
  const [ status, setStatus ] = useState(null);
  const [ data, setData ] = useState(null);

  console.log(users)
  console.log(userData)
  

  // Function to get and merge data
  const getMergedData = () => {
    const usersArray = Array.isArray(users) ? users : Object.values(users);
    const userDataArray = Array.isArray(userData) ? userData : Object.values(userData);
    const accountArray = Array.isArray(accounts) ? accounts : Object.values(accounts);

    console.log(usersArray)

    // Ensure userId is defined and valid
    if (!userId) return null;

    // Find the user and userData by userId
    const filteredUser = usersArray.find((user) => user.Identifier === userId);
    const filteredUserData = userDataArray.find((data) => data.Identifier === userId);
    const account = accountArray.find((a) => a.Identifier === userId);

    if(filteredUserData?.Verification && !account.Status){
      setStatus(true);
    }else{
      setStatus(false);
    }
    // Combine the data if both are available
    const mergedData = filteredUser && filteredUserData ? {
      ...filteredUser,
      ...filteredUserData, // This merges all properties from filteredUserData
      Account:{...account}
    } : null;

    return mergedData;
  };

  // Call the function to get the merged data
  useEffect(() => {
    if (users) {
      const mergedData = getMergedData();
      setData(mergedData);  // Merged data will be stored in local state
    }
  }, [users, userData, accounts]);
  
  
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
  
  function approve(verify){
      let res;
      if(status){ 
        res = axiosInstance.put('admin/classic/Saving', {
          "data" : {
              "Status" : verify,
              "Account" : data.Account.Account
            }
        })
      }else{
      res = axiosInstance.put('admin/classic/Data', {
        "data" : {
            "Verification" : verify,
            "Identifier" : userId
          }
      })
    
    
      
      console.log(res);
    } 
  }

  

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-y-auto flex flex-col items-start justify-start p-4 max-w-[calc(100%_-_444px)] text-left font-inter mq850:max-w-full">
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        <div className="flex flex-col items-start justify-start gap-4 w-full">
        <div className="font-semibold text-inherit text-black inline-block min-w-[7.313rem] mq450:text-[1rem]">
            Client Details
          </div>
          <div className="flex flex-row flex-wrap items-center justify-start py-4 w-full pl-4 gap-4 bg-foundation-yellow-light rounded-lg text-black font-roboto mq450:pr-5 mq725:pr-[12.313rem] mq1025:pr-[24.625rem]">
            <img
              className="h-[5rem] w-[5rem] rounded-lg object-cover"
              loading="lazy"
              alt=""
              src={getFullUrl(data?.Photo) || '/default-profile.png'} // Provide a fallback image
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
        <div className="flex flex-col items-end justify-start p-4 gap-4 w-full">
          <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight text-slate-800 leading-[150%] font-semibold min-w-[4.875rem] mq450:text-[1rem] mq450:leading-[1.5rem]">
              Address
            </div>
            <div className="flex flex-row flex-wrap items-start justify-between gap-4 w-full text-[1rem] text-gray-400 font-roboto ">
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border-dimgray rounded-lg border-[1px] border-solid">
                <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                  Address Line 1
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder={data?.Address?.Address?.[1] || ''}
                  type="text"
                />
              </div>
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border-dimgray rounded-lg border-[1px] border-solid">
                <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                  Address Line 2
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder={data?.Address?.Address?.[2] || ''}
                  type="text"
                />
              </div>
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border-dimgray rounded-lg border-[1px] border-solid text-[0.875rem]">
                <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                  State
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder={data?.Address?.State || ''}
                  type="text"
                />
              </div>
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 borderborder-dimgray rounded-lg border-[1px] border-solid">
                  <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                    City
                  </div>
                  <input disabled
                    className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                    placeholder={data?.Address?.City || ''}
                    type="text"
                  />
                </div>
                <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border-dimgray rounded-lg border-[1px] border-solid">
                  <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                    Zip
                  </div>
                  <input disabled
                    className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                    placeholder={data?.Address?.Zip || ''}
                    type="text"
                  />
                </div>
              
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Employment  & Income Details</div>
            <div className="flex flex-row flex-wrap w-full items-start justify-start gap-8 text-[1rem] text-gray-400 font-roboto">
              <div className="w-[16.125rem] flex flex-col items-start justify-normal p-1 gap-1 border-dimgray rounded-lg border-[1px] border-solid">
                <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                  Employment Status
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder={data?.Employment || ''}
                  type="text"
                />
              </div>
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border-dimgray rounded-lg border-[1px] border-solid">
                <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                  Income
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder={data?.Salary || ''}
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-lg flex flex-row flex-wrap items-start justify-between min-h-[33.75rem] max-w-full">
      <div className="w-[64.125rem] flex flex-row items-start justify-between py-[0rem] px-[1rem] box-border max-w-full gap-[1.25rem] mq975:flex-wrap">
        <div
          className="h-[17rem] w-[20.375rem] flex flex-col items-start justify-start py-[1rem] px-[0.5rem] box-border gap-[0.5rem] max-w-full text-left text-[1.25rem] text-darkslategray-100 font-roboto"
        >
          <div className="self-stretch flex flex-row items-center justify-between p-[0.25rem] gap-[1.25rem]">
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium inline-block min-w-[5.625rem] mq450:text-[1rem]">
              Pan Card
            </div>
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
              loading="lazy"
              alt=""
              src='/check.png'
            />
          </div>
          <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[0.5rem] text-[1.125rem] text-gray-100">
            <div className="self-stretch flex flex-row items-center justify-start pt-[0.468rem] px-[0.25rem] pb-[0.375rem] border-b-[0.5px] border-solid border-darkslategray-100">
              <div className="relative tracking-[0.05em] inline-block min-w-[7.313rem]">
                {data?.Pan_Number || ''}
              </div>
            </div>
            <div className="relative flex flex-row w-full justify-center border rounded box-border overflow-hidden">
              <img
                className="w-full h-[170px] object-contain"
                loading="lazy"
                alt=""
                src={getFullUrl(data?.Pan) || ''}
                style={{ maxWidth: '80%', maxHeight: '80%' }}
              />
            </div>
          </div>
        </div>
        <div className="h-[19rem] w-[20.375rem] flex flex-col items-start justify-start py-[1rem] px-[0.5rem] box-border gap-[0.5rem] max-w-full text-left text-[1.25rem] text-darkslategray-100 font-roboto">
          <div className="self-stretch flex flex-row items-center justify-between p-[0.25rem] gap-[1.25rem]">
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium inline-block min-w-[5.625rem] mq450:text-[1rem]">
              Aaadhar Card
            </div>
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
              loading="lazy"
              alt=""
              src='/check.png'
            />
          </div>
          <div className="self-stretch relative flex-1 flex flex-col items-start justify-start gap-[0.5rem] text-[1.125rem] text-gray-100">
            <div className="self-stretch flex flex-row items-center justify-start pt-[0.468rem] px-[0.25rem] pb-[0.375rem] border-b-[0.5px] border-solid border-darkslategray-100">
              <div className="relative tracking-[0.05em] inline-block min-w-[7.313rem]">
                {data?.Aadhar_Number || ''}
              </div>
            </div>
            <div className="relative flex flex-row w-full h-full justify-center border rounded box-border overflow-hidden">
              <img
                className="w-full h-[170px] object-contain"
                loading="lazy"
                alt=""
                src={getFullUrl(data?.Aadhar) || ''}
                style={{ maxWidth: '80%', maxHeight: '80%' }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[64.125rem] flex flex-row items-start justify-between py-[0rem] px-[1rem] box-border max-w-full gap-[1.25rem] mq975:flex-wrap">
        <div className="h-[12.75rem] w-[20.375rem] flex flex-col items-start justify-start py-[1rem] px-[0.5rem] box-border gap-[0.5rem] max-w-full text-left text-[1.25rem] text-darkslategray-100 font-roboto">
          <div className="self-stretch flex flex-row items-center justify-between p-[0.25rem] gap-[1.25rem]">
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium inline-block min-w-[6.938rem] mq450:text-[1rem]">
              Client Photo
            </div>
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
              loading="lazy"
              alt=""
              src='/check.png'
            />
          </div>
          <div className="self-stretch relative flex-1 rounded overflow-hidden">
            <img
              className="w-full h-full object-contain"
              loading="lazy"
              alt=""
              src={getFullUrl(data?.Photo) || ''}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
        </div>
        <div className="h-[12.75rem] w-[20.375rem] flex flex-col items-start justify-start py-[1rem] px-[0.5rem] box-border gap-[0.5rem] max-w-full text-left text-[1.25rem] text-darkslategray-100 font-roboto">
          <div className="self-stretch flex flex-row items-center justify-between p-[0.25rem] gap-[1.25rem]">
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium inline-block min-w-[6.938rem] mq450:text-[1rem]">
              Client Signature
            </div>
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
              loading="lazy"
              alt=""
              src='/check.png'
            />
          </div>
          <div className="self-stretch relative flex-1 rounded overflow-hidden">
            <img
              className="w-full h-full object-contain"
              loading="lazy"
              alt=""
              src={getFullUrl(data?.Signature) || ''}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
        <div className="flex flex-row items-center justify-center gap-6 text-[1rem] text-foundation-red-normal font-roboto ">
          <div onClick={()=>approve("Rejected")} className="flex-[0.8333] flex items-center justify-center py-[0.906rem] px-6 border border-solid border-foundation-red-normal rounded cursor-pointer">
            <div className="font-medium">
              Cancel
            </div>
          </div>
          <div onClick={()=>approve("Verified")} className=" flex-1 flex items-center justify-center py-[0.906rem] px-5 bg-foundation-red-normal text-white rounded cursor-pointer">
            <div className="font-medium">
              Approve
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetails;
