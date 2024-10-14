import React, { useState, useMemo } from 'react';
import Briefcase from '../../assets/briefcase';
import Hr from '../../assets/hr-person';
import Time from '../../assets/time';
import Apartment from '../../assets/apartment';
import LoanCard from '../../components/LoanCard';
import { useLoanInfoContext } from './LoanInfoContext';
import LoanInfoCard from './LoanInfoCard';

function ApprovedLoans( className ) {
    const { mergedData, selectedLoanType, setSelectedLoanType } = useLoanInfoContext();
    const [recovered, setRecovered] = useState(false);
    const [Loan, setLoan] = useState(selectedLoanType);

    const handleButtonClick = (loanType) => {
        setLoan(loanType);
    };

    // Count loan types (Property, Instant, Personal, Business)
    const loanCounts = useMemo(() => {
        const counts = { Property: 0, Instant: 0, Personal: 0, Business: 0 };
        
        mergedData.forEach((loan) => {
            if (loan.Loan.Type === 'Property') counts.Property++;
            if (loan.Loan.Type === 'Instant') counts.Instant++;
            if (loan.Loan.Type === 'Personal') counts.Personal++;
            if (loan.Loan.Type === 'Business') counts.Business++;
        });

        return counts;
    }, [mergedData]);

    // Filter loans based on loan type and recovery status
    const filteredLoans = mergedData.filter(
        (loan) =>
            loan.Loan.Type === Loan &&
            ((recovered === true && loan.Loan.Status === 'Closed') || 
            (recovered === false && (loan.Loan.Status === 'Active' || loan.Loan.Status === 'Overdue')))
    );

    return (
        <div className={`flex-1 flex flex-col items-start justify-start pt-[0.5rem] px-[0rem] pb-[0rem] box-border w-full text-[1rem] text-white mq850:h-auto mq850:max-w-full`}>
            <div className="flex flex-col w-full items-start justify-start pt-[1rem] gap-[2rem] mq675:gap-[1rem]">
                <div className="self-stretch rounded-xl bg-white box-border flex flex-col items-start justify-start pt-[0rem] pb-[1rem] gap-[1rem] max-w-full shrink-0 z-[1] text-[1rem] text-foundation-blue-normal font-roboto border-[1px] border-solid border-foundation-white-normal-hover">
                    <div className="w-full flex flex-row items-center justify-between max-w-full [row-gap:20px] border-solid border-b-[1px] border-[#E6E6E6]">
                        {/* Loan type buttons with counts */}
                        <div className="flex-auto flex flex-row items-center justify-center text-[16px] font-normal gap-[0.5rem] w-full text-black">
                            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
                                <button onClick={() => handleButtonClick('Property')} className={`navlink2 ${Loan === 'Property' ? 'active' : ''}`}>
                                    <Apartment /> Property Loan ({loanCounts.Property})
                                </button>
                            </div>
                            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
                                <button onClick={() => handleButtonClick('Instant')} className={`navlink2 ${Loan === 'Instant' ? 'active' : ''}`}>
                                    <Time /> Instant Loan ({loanCounts.Instant})
                                </button>
                            </div>
                            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
                                <button onClick={() => handleButtonClick('Personal')} className={`navlink2 ${Loan === 'Personal' ? 'active' : ''}`}>
                                    <Hr /> Personal Loan ({loanCounts.Personal})
                                </button>
                            </div>
                            <div className="flex-auto rounded-tl-xl rounded-tr-xl overflow-x-hidden flex flex-row items-center justify-center box-border text-[16px] font-normal gap-[0.5rem] w-full text-black">
                                <button onClick={() => handleButtonClick('Business')} className={`navlink2 ${Loan === 'Business' ? 'active' : ''}`}>
                                    <Briefcase /> Business Loan ({loanCounts.Business})
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap gap-[16px] items-center justify-between px-[16px] box-border">
                        <button
                            onClick={() => setRecovered(false)}
                            className={`text-[#000] py-[8px] px-[12px] border-none rounded-[16px] text-[14px] font-normal ${recovered === false ? "bg-[#D9E8FB]" : "bg-[#F5F5F8]"}`}>
                            Unrecovered
                        </button>
                        <button
                            onClick={() => setRecovered(true)}
                            className={`text-[#000] py-[8px] px-[12px] border-none rounded-[16px] text-[14px] font-normal ${recovered === true ? "bg-[#D9E8FB]" : "bg-[#F5F5F8]"}`}>
                            Recovered
                        </button>
                    </div>

                    {/* Display filtered and merged data */}
                    <div className="w-full grid grid-cols-3 items-center justify-between px-[16px] box-border">
                        {filteredLoans.map((account, index) => (
                            <LoanInfoCard
                                key={index}
                                phoneno={account.User?.Number}
                                fullname={account.User?.Name}
                                address={account.MergedAddress}
                                profilePicture={account.Data?.Photo}
                                key1={account.User?.Identifier}
                                id={account.Loan?.Loan}
                                amount={account.Loan?.Amount}
                                {...account}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApprovedLoans;
