import React from 'react';
import PropTypes from 'prop-types';
import { useDepositContext } from '../context/SchemeContext';

const FormInput = ({ label, placeholder, type = "text", className = "", inputClassName = "" }) => {
  return (
    <div className={`flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[126px] ${className}`}>
      <div className="relative text-sm font-medium font-roboto text-black text-left inline-block min-w-[66px]">
        {label}
      </div>
      <div className="self-stretch rounded flex flex-row items-center justify-start py-[11px] px-3 border-[1px] border-solid border-foundation-white-normal-hover">
        <input
          className={`w-full border-none outline-none font-medium font-roboto text-base bg-transparent h-[19px] relative text-black text-left inline-block p-0 ${inputClassName}`}
          placeholder={placeholder}
          type={type}
        />
      </div>
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};

const SchemePage = ({ className = "" }) => {
  const { selectedScheme } = useDepositContext();
  console.log(selectedScheme);

  return (
    <form
      className={`m-0 w-full bg-white flex flex-col items-end justify-start pt-2 px-16 pb-[17px] box-border gap-[32px] leading-[normal] tracking-[normal] mq750:gap-[16px] mq750:pl-8 mq750:pt-20 mq750:pr-8 mq750:box-border ${className}`}
    >
      <main className="self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full">
        <div className="flex flex-row items-center justify-center">
          <h2 className="m-0 relative text-[24px] leading-[130%] font-bold font-roboto text-text-primary text-center mq450:text-[19px] mq450:leading-[25px]">
            {selectedScheme}
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
              <FormInput label="Name" placeholder="Value" />
              <FormInput label="Aadhar" placeholder="Value" />
              <FormInput label="PAN" placeholder="Value" />
              <FormInput label="Annual Income" placeholder="Value" />
            </div>

            <div className="self-stretch flex flex-row flex-wrap items-start justify-between gap-[16px_14.7px] min-h-[15px]">
              <FormInput label="Employment Type" placeholder="Type" className="max-w-[335px]" />
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <h3 className="m-0 relative text-xl font-medium font-roboto text-text-primary text-left mq450:text-base">
              Bank Details
            </h3>
            <div className="self-stretch w-full flex flex-row flex-wrap items-start justify-start py-0 pr-[332px] pl-0 gap-[16px] lg:pr-[166px] lg:box-border mq450:pr-5 mq450:box-border mq750:pr-[83px] mq750:box-border">
              <FormInput label="Account No" placeholder="Value" className="max-w-[335px]" />
              <FormInput label="IFSC Code" placeholder="Value" className="max-w-[335px]" />
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
              <FormInput label="Enter Your Amount" placeholder="Value" className="max-w-[335px]" />
              <FormInput label="Tenure" placeholder="in months" className="max-w-[335px]" />
              <FormInput label="Maturity Amount" placeholder="Value" className="max-w-[335px]" />
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
              <FormInput label="Nominee Name" placeholder="Value" />
              <FormInput label="Date of Birth" placeholder="Value" type="date" />
              <FormInput label="Relation" placeholder="Value" />
              <FormInput label="Phone No" placeholder="Value" />
            </div>

            <div className="self-stretch flex flex-row flex-wrap items-start justify-between gap-[16px_14.7px] min-h-[15px]">
              <FormInput label="PAN Card" placeholder="Value" className="max-w-[335px]" />
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
        <button className="cursor-pointer [border:none] py-4 px-9 bg-foundation-red-normal rounded flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumvioletred-100">
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
