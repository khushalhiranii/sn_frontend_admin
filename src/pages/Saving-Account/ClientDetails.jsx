import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useParams } from 'react-router-dom';


function ClientDetails() {
  const { userId } = useParams(); // Get the userId from the URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://sn-backend.vercel.app/api/v1/admin/user/${userId}`);
        const user = res.data.data.map(item => item.phoneno);
        setUser(user);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]); // Re-run the effect if userId changes

  // if (!user) {
  //   return <div>Loading...</div>;
  // }
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
              src="/rectangle-8531@2x.png"
            />
            <div className="flex-1 flex flex-col items-start justify-start gap-2 min-w-[5.063rem]">
              <div className="font-medium min-w-[6.5rem] mq450:text-[1rem]">
                Name | Age
              </div>
              <div className="text-[1rem] font-medium min-w-[7.813rem]">
                Phone No | E-mail
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-start p-4 gap-4 w-full">
          <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight text-slate-800 leading-[150%] font-semibold min-w-[4.875rem] mq450:text-[1rem] mq450:leading-[1.5rem]">
              Address
            </div>
            <div className="flex flex-row flex-wrap items-start justify-between gap-4 w-full text-[1rem] text-gray-400 font-roboto">
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border border-dimgray rounded-lg">
                <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                  Address Line 1
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder="Value"
                  type="text"
                />
              </div>
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border border-dimgray rounded-lg">
                <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                  Address Line 2
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder="Value"
                  type="text"
                />
              </div>
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border border-dimgray rounded-lg text-[0.875rem]">
                <div className="min-w-[2.063rem]">
                  State
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder="Value"
                  type="text"
                />
              </div>
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border border-dimgray rounded-lg">
                  <div className="min-w-[1.5rem]">
                    City
                  </div>
                  <input disabled
                    className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                    placeholder="Value"
                    type="text"
                  />
                </div>
                <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border border-dimgray rounded-lg">
                  <div className="min-w-[1.25rem]">
                    Zip
                  </div>
                  <input disabled
                    className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                    placeholder="Value"
                    type="text"
                  />
                </div>
              
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="tracking-tight leading-[150%] text-slate-800 font-semibold whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">Employment  & Income Details</div>
            <div className="flex flex-row flex-wrap w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
              <div className="w-[16.125rem] flex flex-col items-start justify-normal p-1 gap-1 border border-dimgray rounded-lg">
                <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                  Employment Status
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder="Value"
                  type="text"
                />
              </div>
              <div className="w-[16.125rem] flex flex-col items-start justify-start p-1 gap-1 border border-dimgray rounded-lg">
                <div className="tracking-tight leading-[150%] font-medium min-w-[6.438rem]">
                  Income
                </div>
                <input disabled
                  className="w-full border-none outline-none bg-transparent h-[1.875rem] text-[1.25rem] text-dimgray font-medium"
                  placeholder="Value"
                  type="text"
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
          <div className="h-[3rem] flex-1 flex items-center justify-center py-[0.906rem] px-5 bg-foundation-red-normal text-white rounded">
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
