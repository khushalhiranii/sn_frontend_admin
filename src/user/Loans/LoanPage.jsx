import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLoanContext } from '../context/LoanContext';
import { useUserSocket } from '../context/UserSocketContext';
import FormInput from '../DesignSystem/FormInput';
import axiosInstance from '../../../axios.utils';
import Loader from '../../LoadingIndicator/Loader';
import { Navigate } from 'react-router-dom';
import RedButton from '../DesignSystem/RedButton';
import OutlinedButton from '../../admin/components/OutlinedButton';


const LoanPage = ({ className = "" }) => {
  const { selectedLoan } = useLoanContext();
  const { user, account, userData } = useUserSocket();
  const [loanDetails, setLoanDetails] = useState({"Type": selectedLoan, "Interest": 0});
  const [guarantorDetails, setGuarantorDetails] = useState({});
  const [documents, setDocuments] = useState(null);  // For file uploads
  const [loading, setLoading]= useState(true)
  const [api, setApi] = useState(false);

  useEffect(() => {
    // Simulate loading effect after a brief delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);


  const handleInputChange = (e, key, section) => {
    const value = e.target.value;
    if (section === 'loan') {
      setLoanDetails((prevDetails) => ({
        ...prevDetails,
        [key]: value,
      }));
    } else if (section === 'guarantor') {
      setGuarantorDetails((prevDetails) => ({
        ...prevDetails,
        [key]: value,
      }));
    }
  };

  const handleDocumentUpload = (e) => {
    setDocuments(e.target.files[0]);  // Assuming single file upload
  };

  const submitLoanDetailsAPI = async (loanData) => {
    // API call for submitting loan details
    let response;
    if(selectedLoan === "Personal" || selectedLoan === "Instant"){
      response = await axiosInstance.post('/client/classic/Loan', {
        "data" : {...loanData, "Identifier" : user?.Identifier}
      });
    }else if(selectedLoan === "Micro Finance"){
      response = await axiosInstance.post('/client/classic/Loan/Micro', {
        "data" : {...loanData, "Identifier" : user?.Identifier}
      });
    }else if(selectedLoan === "Property"){
      response = await axiosInstance.post('/client/classic/Loan/Property', {
        "data" : {...loanData, "Identifier" : user?.Identifier}
      });
    }else if(selectedLoan === "Business"){
      response = await axiosInstance.post('/client/classic/Loan/Buisness/Joint', {
        "data" : {...loanData, "Identifier" : user?.Identifier}
      });
    }
    console.log(response)
    
    return await response;
  };
  
  const submitGuarantorDetailsAPI = async (guarantorData, loanId) => {
    // API call for submitting guarantor details
    const response = await axiosInstance.post('client/classic/Guarantor', {
      "data" : {...guarantorData,
        "Request": loanId
      }
    });
    return await response;
  };
  
  const uploadDocumentsAPI = async (documentFile, loanId) => {
    const formData = new FormData();
    formData.append('Loan-Docs', documentFile);
  
    const response = await axiosInstance.post(`/client/classic/Loan/Property/Docs?Request=${loanId}`, formData);
    return await response;
  };

  const submitLoan = async (e) => {
    e.preventDefault();  // Prevent the default form submission
    try {
      setApi(true)
      let loanData = { ...loanDetails };
      console.log(loanData);
      console.log(guarantorDetails);
  
      // Call the API to submit the loan details
      const response = await submitLoanDetailsAPI(loanData); // Replace with actual API call
      console.log(response);
  
      // Submit guarantor details if a loan ID is received
      if (response?.data?.loan) {
        await submitGuarantorDetailsAPI(guarantorDetails, response?.data?.loan); // Replace with actual API call
  
        // Upload documents if necessary
        if (documents) {
          await uploadDocumentsAPI(documents, response?.data?.loan); // Replace with actual API call
        }
        setApi(false);
        alert("Loan application successful!");

      }
    } catch (error) {
      console.error("Loan application failed", error);
      setApi(false);
      alert("Error occurred while applying for the loan.");
    }
  };
  

  console.log(selectedLoan);
  if(loading){
    return(
      <Loader/>
    )
  }

  if (!user || Object.keys(user).length === 0) {
    return <Navigate to={'/login'} />;
  }
  return (
    <form
    onSubmit={submitLoan}
      className={`m-0 w-full bg-white flex flex-col items-end justify-start pt-2 px-16 pb-[17px] box-border gap-[32px] leading-[normal] tracking-[normal] mq750:gap-[16px] mq750:pl-8 mq750:pt-20 mq750:pr-8 mq750:box-border ${className}`}
    >
      <main className="self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full">
        <div className="flex flex-row items-center justify-center">
          <h2 className="m-0 relative text-[24px] leading-[130%] font-bold font-roboto text-text-primary text-center mq450:text-[19px] mq450:leading-[25px]">
            {selectedLoan} Loan
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

            <div className="self-stretch flex flex-row flex-wrap items-start justify-between gap-[16px_14.7px] min-h-[15px]">
              
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <h3 className="m-0 relative text-xl font-medium font-roboto text-text-primary text-left mq450:text-base">
              Bank Details
            </h3>
            <div className="self-stretch flex flex-row flex-wrap items-start justify-between gap-[16px_14.7px] min-h-[15px]">
              <FormInput label="Account No" value={account.Account} />
              <FormInput label="IFSC Code" placeholder="Value" />
              <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[126px] max-w-[306px]">
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
              Loan Details
            </h3>
            <div className="self-stretch flex flex-row flex-wrap items-start justify-between gap-[16px_14.7px] min-h-[15px]">
              <FormInput label="Enter Your Amount" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Amount', 'loan')} />
              <FormInput label="Tenure" placeholder="in weeks" onChange={(e)=> handleInputChange(e, 'Tenure', 'loan')} />
              <FormInput label="Purpose of Loan" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Purpose', 'loan')} />
              {selectedLoan === 'Micro Finance' && 
              (<>
              <FormInput label="Shop Name" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Name', 'loan')} />
                <FormInput label="Nature of Business" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Nature', 'loan')} />
                <FormInput label="Shop Address" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Address', 'loan')} />
                <FormInput label="Age of Business" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Age', 'loan')} />
                <FormInput label="Monthly Income" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Profit', 'loan')} />
                </>
              )
              }
            </div>
          </div>

          {selectedLoan === 'Property' && 
          (<div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
          <h3 className="m-0 relative text-xl font-medium font-roboto text-text-primary text-left mq450:text-base">
            Property Details
          </h3>
          <div className="self-stretch flex flex-row flex-wrap items-start justify-between gap-[16px_14.7px] min-h-[15px]">
            <FormInput label="Property Address" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Address', 'loan')} />
            <FormInput label="Property Type" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Nature', 'loan')} />
            <FormInput label="Purchase Date" type='date' onChange={(e)=> handleInputChange(e, 'Purchased', 'loan')} />
            <FormInput label="Value" placeholder="Value" onChange={(e)=> {handleInputChange(e, 'Value', 'loan')}} />
            <FormInput label="Property Documents" type='File' onChange={handleDocumentUpload} />
          </div>
        </div>)
          }

{selectedLoan === 'Business' && 
          (<div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
          <h3 className="m-0 relative text-xl font-medium font-roboto text-text-primary text-left mq450:text-base">
            Business Details
          </h3>
          <div className="self-stretch flex flex-row flex-wrap items-start justify-between gap-[16px_14.7px] min-h-[15px]">
            <FormInput label="Name" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Name', 'loan')} />
            <FormInput label="Nature" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Nature', 'loan')} />
            {/* <FormInput label="Age" placeholder="Value"  /> */}
            <FormInput label="Pin Code" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Zip', 'loan')} />
            <FormInput label="Net Profit" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Profit', 'loan')} />
            {/* <FormInput label="Industry" placeholder="Value" /> */}
            <FormInput label="Phone" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Phone', 'loan')} />
            <FormInput label="Mail" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Mail', 'loan')} />
            <FormInput label="PAN No" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Pan', 'loan')} />
            <FormInput label="Udhyam" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Udhyam', 'loan')} />
            <FormInput label="GST No" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Gst', 'loan')} />
          </div>
        </div>)
          }

          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <div className="self-stretch flex flex-row items-center justify-between gap-[20px] mq450:flex-wrap">
              <div className="flex flex-row items-center justify-center">
                <a className="no-underline relative text-xl font-medium font-roboto text-text-primary text-left inline-block min-w-[108px] mq450:text-base">
                  Guarantor Details
                </a>
              </div>
            </div>

            <div className="self-stretch flex flex-row flex-wrap items-start justify-between gap-[16px_14.7px] min-h-[15px]">
              <FormInput label="Guarantor Name" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Name', 'guarantor')} />
              <FormInput label="Phone No" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Phone', 'guarantor')} />
              <FormInput label="Mail" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Mail', 'guarantor')} />
              <FormInput label="Address" placeholder="Value" onChange={(e)=> handleInputChange(e, 'Address', 'guarantor')} />
              <div className={`flex-1 flex flex-col items-start justify-center max-w-[306px] gap-[8px] min-w-[306px] ${className}`}>
                <div className="relative text-sm font-medium font-roboto text-black text-left inline-block min-w-[66px]">
                  Relation
                </div>
                <div className="self-stretch rounded flex flex-row items-center justify-start py-[11px] px-3 border-[1px] border-solid border-foundation-white-normal-hover">
                  <select
                    value={guarantorDetails?.Relation || ""}
                    className={`w-full border-none outline-none font-medium font-roboto text-base bg-transparent h-[19px] relative text-black text-left inline-block p-0`}
                    onChange={(e)=> handleInputChange(e, 'Relation', 'guarantor')}
                  >
                    <option value="" disabled>Select a relation</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Uncle">Uncle</option>
                    <option value="Aunt">Aunt</option>
                    <option value="Friend">Friend</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <FormInput label="PAN No" placeholder="Value"  onChange={(e)=> handleInputChange(e, 'Pan', 'guarantor')} />
            </div>
          </div>
        </section>
      </main>

      <div className="flex flex-row items-start justify-start gap-[24px] max-w-full mq450:flex-wrap">
        <OutlinedButton label={"Cancel"} />
        <RedButton label={"Apply Now"} type={"submit"} loading={api} />
      </div>
    </form>
  );
};

LoanPage.propTypes = {
  className: PropTypes.string,
};

export default LoanPage;
