import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../axiosSetup';

function ClientDetails() {
  const { userId } = useParams(); // Get the userId from the URL
  const [user, setUser] = useState(null); // Initial state should be null or an empty object
  const axios = useAxios();

  function calculateAge(dobString) {
    const dob = new Date(dobString);
    const now = new Date();
  
    let age = now.getFullYear() - dob.getFullYear();
    const monthDifference = now.getMonth() - dob.getMonth();
    const dayDifference = now.getDate() - dob.getDate();
  
    // Adjust the age if the current date is before the birthday in the current year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
  
    return age;
  }
  
  async function approve(){
    try {
      const res = await axios.post(`https://sn-backend.vercel.app/api/v1/admin/user/account/requests/${userId}`);
      const user = res.data.data;
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://sn-backend.vercel.app/api/v1/admin/user/account/requests/${userId}`);
        const user = res.data.data;
        setUser(user);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]); // Re-run the effect if userId changes

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-y-auto flex flex-col items-start justify-start p-4 max-w-[calc(100%_-_344px)] text-left text-white font-inter mq850:max-w-full">
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        <div className="flex flex-col items-start justify-start gap-4 w-full">
          <a className="font-semibold text-inherit inline-block min-w-[7.313rem] mq450:text-[1rem]">
            Client Details
          </a>
          <div className="flex flex-row flex-wrap items-center justify-start py-4 pr-[49.312rem] pl-4 gap-4 bg-foundation-yellow-light rounded-lg text-black font-roboto mq450:pr-5 mq725:pr-[12.313rem] mq1025:pr-[24.625rem]">
            <img
              className="h-[5rem] w-[5rem] rounded-lg object-cover"
              loading="lazy"
              alt=""
              src={user?.account?.photo || '/default-profile.png'} // Provide a fallback image
            />
            <div className="flex-1 flex flex-col items-start justify-start gap-2 min-w-[5.063rem]">
              <div className="font-medium min-w-[6.5rem] mq450:text-[1rem]">
                {user.fullname} | {calculateAge(user.dob)}
              </div>
              <div className="text-[1rem] font-medium min-w-[7.813rem]">
                {user.phoneno} | {user.email}
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
                  placeholder={user?.account?.address1 || ''}
                  type="text"
                />
              </div>
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border-dimgray rounded-lg border-[1px] border-solid">
                <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                  Address Line 2
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder={user?.account?.address2 || ''}
                  type="text"
                />
              </div>
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border-dimgray rounded-lg border-[1px] border-solid text-[0.875rem]">
                <div className="min-w-[2.063rem]">
                  State
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder={user?.account?.state || ''}
                  type="text"
                />
              </div>
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 borderborder-dimgray rounded-lg border-[1px] border-solid">
                  <div className="min-w-[1.5rem]">
                    City
                  </div>
                  <input disabled
                    className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                    placeholder={user?.account?.city || ''}
                    type="text"
                  />
                </div>
                <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border-dimgray rounded-lg border-[1px] border-solid">
                  <div className="min-w-[1.25rem]">
                    Zip
                  </div>
                  <input disabled
                    className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                    placeholder={user?.account?.zip || ''}
                    type="text"
                  />
                </div>
              
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Employment  & Income Details</div>
            <div className="flex flex-row flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
              <div className="w-[16.125rem] flex flex-col items-start justify-normal p-1 gap-1 border-dimgray rounded-lg border-[1px] border-solid">
                <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                  Employment Status
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder={user?.account?.emp_type || ''}
                  type="text"
                />
              </div>
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border-dimgray rounded-lg border-[1px] border-solid">
                <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                  Income
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder={user?.account?.income || ''}
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-lg flex flex-row flex-wrap items-start justify-between min-h-[33.75rem] max-w-full">
      <div className="w-[64.125rem] flex flex-row items-start justify-between py-[0rem] px-[1rem] box-border max-w-full gap-[1.25rem] mq975:flex-wrap">
        <div
          className="h-[19rem] w-[20.375rem] flex flex-col items-start justify-start py-[1rem] px-[0.5rem] box-border gap-[0.5rem] max-w-full text-left text-[1.25rem] text-darkslategray-100 font-roboto"
        >
          <div className="self-stretch flex flex-row items-center justify-between p-[0.25rem] gap-[1.25rem]">
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium inline-block min-w-[5.625rem] mq450:text-[1rem]">
              Pan Card
            </div>
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
              loading="lazy"
              alt=""
              src={user?.account?.pandetail?.url ? '/checkcircle-1.svg' : ''}
            />
          </div>
          <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[0.5rem] text-[1.125rem] text-gray-100">
            <div className="self-stretch flex flex-row items-center justify-start pt-[0.468rem] px-[0.25rem] pb-[0.375rem] border-b-[0.5px] border-solid border-darkslategray-100">
              <div className="relative tracking-[0.05em] inline-block min-w-[7.313rem]">
                {user?.account?.pandetail?.docno || ''}
              </div>
            </div>
            <div className="self-stretch relative flex-1 rounded overflow-hidden">
    <img
      className="w-full h-full object-contain"
      loading="lazy"
      alt=""
      src={user?.account?.pandetail?.url || ''}
      style={{ maxWidth: '80%', maxHeight: '80%' }}
    />
  </div>
          </div>
        </div>
        <div
          className="h-[19rem] w-[20.375rem] flex flex-col items-start justify-start py-[1rem] px-[0.5rem] box-border gap-[0.5rem] max-w-full text-left text-[1.25rem] text-darkslategray-100 font-roboto"
        >
          <div className="self-stretch flex flex-row items-center justify-between p-[0.25rem] gap-[1.25rem]">
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium inline-block min-w-[5.625rem] mq450:text-[1rem]">
              Aaadhar Card
            </div>
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
              loading="lazy"
              alt=""
              src='/checkcircle-1.svg'
            />
          </div>
          <div className="self-stretch relative flex-1 flex flex-col items-start justify-start gap-[0.5rem] text-[1.125rem] text-gray-100">
  <div className="self-stretch flex flex-row items-center justify-start pt-[0.468rem] px-[0.25rem] pb-[0.375rem] border-b-[0.5px] border-solid border-darkslategray-100">
    <div className="relative tracking-[0.05em] inline-block min-w-[7.313rem]">
      {user?.account?.aadhardetail?.docno || ''}
    </div>
  </div>
  <div className="self-stretch relative flex-1 rounded overflow-hidden">
    <img
      className="w-full h-full object-contain"
      loading="lazy"
      alt=""
      src={user?.account?.aadhardetail?.url || ''}
      style={{ maxWidth: '80%', maxHeight: '80%' }}
    />
  </div>
</div>


        </div>
      </div>
      <div className="w-[64.125rem] flex flex-row items-start justify-between py-[0rem] px-[1rem] box-border max-w-full gap-[1.25rem] mq975:flex-wrap">
        <div
          className="h-[12.75rem] w-[20.375rem] flex flex-col items-start justify-start py-[1rem] px-[0.5rem] box-border gap-[0.5rem] max-w-full text-left text-[1.25rem] text-darkslategray-100 font-roboto"
        >
          <div className="self-stretch flex flex-row items-center justify-between p-[0.25rem] gap-[1.25rem]">
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium inline-block min-w-[6.938rem] mq450:text-[1rem]">
              Client Photo
            </div>
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
              loading="lazy"
              alt=""
              src={user?.account?.photo ? '/checkcircle-1.svg' : ''}
            />
          </div>
          <div className="self-stretch relative flex-1 rounded overflow-hidden">
    <img
      className="w-full h-full object-contain"
      loading="lazy"
      alt=""
      src={user?.account?.photo || ''}
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    />
  </div>

        </div>
        <div
          className="h-[12.75rem] w-[20.375rem] flex flex-col items-start justify-start py-[1rem] px-[0.5rem] box-border gap-[0.5rem] max-w-full text-left text-[1.25rem] text-darkslategray-100 font-roboto"
        >
          <div className="self-stretch flex flex-row items-center justify-between p-[0.25rem] gap-[1.25rem]">
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium inline-block min-w-[6.938rem] mq450:text-[1rem]">
              Client Signature
            </div>
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
              loading="lazy"
              alt=""
              src={user?.account?.signature ? '/checkcircle-1.svg' : ''}
            />
          </div>
          <div className="self-stretch relative flex-1 rounded overflow-hidden">
    <img
      className="w-full h-full object-contain"
      loading="lazy"
      alt=""
      src={user?.account?.signature || ''}
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    />
  </div>
        </div>
      </div>
    </div>
        <div className="flex flex-row items-center justify-center gap-6 text-[1rem] text-foundation-red-normal font-roboto">
          <div className="h-[3rem] flex-[0.8333] flex items-center justify-center py-[0.906rem] px-6 border border-foundation-red-normal rounded">
            <div className="font-medium">
              Cancel
            </div>
          </div>
          <div onClick={approve} className="h-[3rem] flex-1 flex items-center justify-center py-[0.906rem] px-5 bg-foundation-red-normal text-white rounded">
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
