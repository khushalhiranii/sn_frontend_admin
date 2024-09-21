import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDepositContext } from '../context/SchemeContext';
import FormInput from '../DesignSystem/FormInput';
import { useUserSocket } from '../context/UserSocketContext';
import axiosInstance from '../../../axios.utils';

const SchemePage = ({ className = "" }) => {
  const { selectedScheme } = useDepositContext();
  const { user, userData, account } = useUserSocket();
  const [schemeDetails, setSchemeDetails] = useState({"Identifier" : user.Identifier, "Type": selectedScheme, "Interest": 0, "Income": 0, "Address": ""});
  const [nomineeDetails, setNomineeDetails] = useState({});

  const handleInputChange = (e, key, section) => {
    const value = e.target.value;
    if (section === 'scheme') {
      setSchemeDetails((prevDetails) => ({
        ...prevDetails,
        [key]: value,
      }));
    } else if (section === 'nominee') {
      setNomineeDetails((prevDetails) => ({
        ...prevDetails,
        [key]: value,
      }));
    }
  };

  const submitSchemeDetailsAPI = async (schemeData) => {
    // API call for submitting loan details
    const response = await axiosInstance.post('/client/classic/Scheme', {
      "data" : {...schemeData}
    });
    
    console.log(response)
    
    return await response;
  };
  
  const submitNomineeDetailsAPI = async (nomineeData, schemeId) => {
    // API call for submitting nominee details
    const response = await axiosInstance.post('client/classic/Nominie', {
      "data" : {...nomineeData,
        "Scheme": schemeId
      }
    });
    return await response;
  };
  

  const submitScheme = async (e) => {
    e.preventDefault();  // Prevent the default form submission
    try {
      let schemeData = { ...schemeDetails };
      console.log(schemeData);
      console.log(nomineeDetails);
  
      // Call the API to submit the loan details
      const response = await submitSchemeDetailsAPI(schemeData); // Replace with actual API call
      console.log(response);
  
      // Submit nominee details if a loan ID is received
      if (response?.data?.Scheme) {
        await submitNomineeDetailsAPI(nomineeDetails, response?.data?.Scheme); // Replace with actual API call
  
        // Upload documents if necessary
  
        alert("Scheme application successful!");
      }
    } catch (error) {
      console.error("Scheme application failed", error);
      alert("Error occurred while applying for the loan.");
    }
  };
  
  if(!user || !account){
    return(
      <div>Loading..</div>
    )
  }

  return (
    <form
    onSubmit={submitScheme}
      className={`m-0 w-full bg-white flex flex-col items-end justify-start pt-2 px-16 pb-[17px] box-border gap-[32px] leading-[normal] tracking-[normal] mq750:gap-[16px] mq750:pl-8 mq750:pt-20 mq750:pr-8 mq750:box-border ${className}`}
    >
      <main className="self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full">
        <div className="flex flex-row items-center justify-center">
          <h2 className="m-0 relative text-[24px] leading-[130%] font-bold font-roboto text-text-primary text-center mq450:text-[19px] mq450:leading-[25px]">
            {selectedScheme} Deposit
          </h2>
        </div>

        <section className="self-stretch flex flex-col items-start justify-start gap-[32px] max-w-full mq750:gap-[16px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <div className="self-stretch flex flex-row items-center justify-between gap-[20px] mq450:flex-wrap">
              <div className="flex flex-row items-center justify-center">
                <a className="no-underline relative text-xl font-medium font-roboto text-text-primary text-left inline-block min-w-[108px] mq450:text-base">
                  User Details
                </a>
              </div>
              <div className="relative text-sm font-roboto text-gray text-left">
                * As per Saving account
              </div>
            </div>

            <div className="self-stretch flex flex-row flex-wrap items-start justify-between gap-[16px_14.7px] min-h-[15px]">
            <FormInput label="Name" value= {user.Name} />
              <FormInput label="Aadhar" value={userData.Aadhar_Number} />
              <FormInput label="PAN" value={userData.Pan_Number} />
              <FormInput label="Annual Income" value={userData.Salary} />
              <FormInput label="Employment Type" value={userData.Employment}/>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <h3 className="m-0 relative text-xl font-medium font-roboto text-text-primary text-left mq450:text-base">
              Bank Details
            </h3>
            <div className="self-stretch w-full flex flex-row flex-wrap items-start justify-start py-0 pr-[332px] pl-0 gap-[16px] lg:pr-[166px] lg:box-border mq450:pr-5 mq450:box-border mq750:pr-[83px] mq750:box-border">
            <FormInput label="Account No" value={account.Account} />
              <FormInput label="IFSC Code" placeholder="Value" />
              <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[126px] max-w-[335px]">
                <div className="relative text-sm font-medium font-roboto text-black text-left">
                  Statement (last 6 months)
                </div>
                <button className="cursor-pointer py-[11px] px-5 bg-transparent self-stretch rounded flex flex-row items-center justify-center border-[1px] border-solid border-foundation-white-normal-hover hover:bg-silver-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-silver-100">
                  <div className="relative text-base underline font-medium font-roboto text-black text-left inline-block min-w-[51px]">
                    Upload
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <h3 className="m-0 relative text-xl font-medium font-roboto text-text-primary text-left mq450:text-base">
              Scheme Details
            </h3>
            <div className="self-stretch w-full flex flex-row flex-wrap items-start justify-start py-0 pr-[332px] pl-0 gap-[16px] lg:pr-[166px] lg:box-border mq450:pr-5 mq450:box-border mq750:pr-[83px] mq750:box-border">
              <FormInput label="Enter Your Amount" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Amount', 'scheme')} />
              <FormInput label="Tenure" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Tenure', 'scheme')} />
              <FormInput label="Maturity Amount" placeholder="Value" />
              <div className="relative text-sm font-small font-roboto text-black text-left">
                *Maturity Amount (Calculated from above entries)
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <div className="self-stretch flex flex-row items-center justify-between gap-[20px] mq450:flex-wrap">
              <div className="flex flex-row items-center justify-center">
                <a className="no-underline relative text-xl font-medium font-roboto text-text-primary text-left inline-block min-w-[108px] mq450:text-base">
                  Nominee Details
                </a>
              </div>
            </div>

            <div className="self-stretch flex flex-row flex-wrap items-start justify-between gap-[16px_14.7px] min-h-[15px]">
              <FormInput label="Nominee Name" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Name', 'nominee')} />
              <FormInput label="Date of Birth" placeholder="Value" type="date" onChange={(e)=> handleInputChange(e, 'Birth', 'nominee')} />
              <FormInput label="Relation" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Relation', 'nominee')} />
              <FormInput label="Phone No" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Phone', 'nominee')} />
              <FormInput label="PAN Card" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Pan', 'nominee')} />
              {/* <FormInput label="Address" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Address', 'nominee')} /> */}
            </div>
          </div>
        </section>
      </main>

      <div className="flex flex-row items-start justify-start gap-[24px] max-w-full mq450:flex-wrap">
        <button className="cursor-pointer py-3.5 px-[49px] bg-[transparent] rounded flex flex-row items-center justify-center border-[1px] border-solid border-foundation-red-normal hover:bg-mediumvioletred-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-mediumvioletred-100">
          <div className="relative text-base font-medium font-roboto text-foundation-red-normal text-left inline-block min-w-[50px]">
            Cancel
          </div>
        </button>
        <button type="submit" className="cursor-pointer [border:none] py-4 px-9 bg-foundation-red-normal rounded flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumvioletred-100">
          <div className="relative text-base font-medium font-roboto text-white text-left inline-block min-w-[77px]">
            Apply Now
          </div>
        </button>
      </div>
    </form>
  );
};

SchemePage.propTypes = {
  className: PropTypes.string,
};

export default SchemePage;
