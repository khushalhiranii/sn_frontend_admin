import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAgentSocket } from '../context/AgentSocketContext';
import { getFullUrl } from '../../admin/utils';
import { calculateAge } from '../../admin/calculateAge';
import Loader from '../../LoadingIndicator/Loader';
import InputComponent from '../../admin/components/InputComponent';
import RedButton from '../../user/DesignSystem/RedButton';
import axiosInstance from '../../../axios.utils';
import PaymentTable from './PaymentTable';
import UpdateClientForm from '../components/UpdateClientForm';

function ClientInfoAgent() {
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const { userId, loanId } = useParams();
  const location = useLocation(); // Get the current path

  const { users, overdueLoans, todaysLoans, closedLoans, bufferLoans, properties } = useAgentSocket();
  const userArray = Object.values(users);
  const data = userArray.find((u) => u.Identifier === userId);

  // Determine which loans and properties to search based on pathname and loanId prefix
  let loansArray = [];
  let propertiesArray = [];

  if (loanId.startsWith('LN')) {
    if (location.pathname.includes('home')) {
      loansArray = Object.values(todaysLoans);
    } else if (location.pathname.includes('pending')) {
      loansArray = Object.values(overdueLoans);
    }else if (location.pathname.includes('due')){
      loansArray = Object.values(bufferLoans);
    }else if (location.pathname.includes('history')) {
      loansArray = Object.values(closedLoans);
    }
  } else if (loanId.startsWith('RQ')) {
    if (location.pathname.includes('home')) {
      propertiesArray = Object.values(properties?.Todays || []);
    } else if (location.pathname.includes('due') || location.pathname.includes('pending')) {
      propertiesArray = Object.values(properties?.Pending || []);
    } else if (location.pathname.includes('history')) {
      propertiesArray = Object.values(properties?.Verified || []);
    }
  }

  // Find the matching loan or property based on loanId
  const loanData = loansArray.find((loan) => loan.Loan === loanId);
  const propertyData = propertiesArray.find((prop) => prop.Request === loanId);

  console.log('Loan Data:', loanData);
  console.log('Property Data:', propertyData);

  const updateAdmin= async()=>{
    setLoading(true);
    try {
        const res = await axiosInstance.put('/agent/classic/Loan/Property/Verification',{
            "Request": loanId,
            "Verification": true
        })
        console.log(res)
        if(res.status == 200){alert("Updated to Admin");
            navigate('/agent/pending')
        }
        
    } catch (error) {
        console.error(error)
        alert(error);
    }finally{
        setLoading(false);
    }
  }

  if (
    !users ||
    !Object.keys(users).length ||
    (!loansArray.length && !propertiesArray.length)
  ) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-start justify-start w-[70%] px-4 py-8 text-left text-white font-inter mq850:max-w-full">
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        <div className="flex flex-col items-start justify-start gap-4 w-full">
          <div className="flex flex-row flex-wrap items-center justify-start py-4 pl-4 w-full gap-4 bg-[#F5F5F5] rounded-lg text-black font-roboto mq450:pr-5 mq725:pr-[12.313rem] mq1025:pr-[24.625rem]">
            <img
              className="h-[5rem] w-[5rem] rounded-lg object-cover"
              loading="lazy"
              alt=""
              src={getFullUrl(data?.Photo)} // Provide a fallback image if needed
            />
            <div className="flex-1 flex flex-col items-start justify-start gap-2 min-w-[5.063rem]">
              <div className="font-medium min-w-[6.5rem] mq450:text-[1rem]">
                {data?.Name} | {calculateAge(data?.Birth)}
              </div>
              <div className="text-[1rem] font-medium min-w-[7.813rem]">
                {data?.Number} | {data?.Mail}
              </div>
            </div>
          </div>

          {/* Display loan or property data if available */}
          {loanData && (
            <div className="flex flex-col items-end justify-start p-4 gap-8 w-full">
                <div className="flex flex-col items-start justify-start gap-2 w-full">
                    <div className="tracking-tight text-[20px] text-slate-800 leading-[150%] font-semibold min-w-[4.875rem] mq450:text-[1rem] mq450:leading-[1.5rem]">
                        Loan Details
                    </div>
                    <div className="grid grid-cols-4 mq675:grid mq675:grid-cols-2 w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
                        <InputComponent label={"Type of Loan"} value={loanData.Type}/>
                        <InputComponent label={"EMI"} value={loanData.Emi}/>
                        <InputComponent label={"Date of Installment"} value={loanData.Installment}/>
                        <InputComponent label={"Interest"} value={loanData.Interest}/>
                        <InputComponent label={"Loan Amount"} value={loanData.Amount}/>
                    </div>
                    
                    <PaymentTable transactions={loanData.Transactions} />
                    <UpdateClientForm />
                    
                </div>
          </div>
          )}

          {propertyData && (
            <div className="flex flex-col items-end justify-start p-4 gap-8 w-full">
                <div className="flex flex-col items-start justify-start gap-2 w-full">
                    <div className="tracking-tight text-[20px] text-slate-800 leading-[150%] font-semibold min-w-[4.875rem] mq450:text-[1rem] mq450:leading-[1.5rem]">
                        Property Details
                    </div>
                    <div className="grid grid-cols-4 mq675:grid mq675:grid-cols-2 w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
                        <InputComponent label={"Address"} value={propertyData.Address}/>
                        <InputComponent label={"Value"} value={propertyData.Value}/>
                        <InputComponent label={"Loan Amount"} value={propertyData.Amount}/>
                        <InputComponent label={"Type"} value={propertyData.Nature}/>
                        <InputComponent label={"Date Purchased"} value={propertyData.Purchased}/>
                        <InputComponent label={"Purpose of Loan"} value={propertyData.Purpose}/>
                    </div>
                    <div className="tracking-tight text-[16px] text-slate-800 leading-[150%] font-semibold min-w-[4.875rem] mq450:text-[0.75rem]">
                        View Documents
                    </div>
                    <div className="tracking-tight flex flex-row gap-8 items-center text-[14px] text-slate-800 leading-[150%] mq450:text-[1rem] mq450:leading-[1.5rem]">
                        <div>View User uploaded Documents</div>
                        <button 
                          className='px-[16px] py-[8px] bg-[#FFEAB0] border-none rounded-sm cursor-pointer hover:bg-yellow-100' 
                          onClick={() => window.open(getFullUrl(propertyData.Document), '_blank', 'noopener,noreferrer')}
                        >
                          View Documents
                        </button>

                    </div>
                </div>
                {propertyData.Verification == false && <RedButton label="Update to Admin" onClick={()=>updateAdmin()} loading={loading} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientInfoAgent;
