import React from 'react'
import LoanDetails from '../../components/LoanDetails'
import Loan from '../Dashboard/loan'
import Apartment from '../../assets/apartment'
import Hr from '../../assets/hr-person'
import Briefcase from '../../assets/briefcase'
import Time from '../../assets/time'


function LoanInfo() {
  return (
    <div className="flex-1 flex flex-col items-start justify-start pt-[2rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_344px)] text-[1rem] text-white mq850:h-auto mq850:max-w-full">
      <div className="self-stretch flex flex-col items-start justify-start gap-[1.937rem] max-w-full shrink-0 mq675:gap-[0.938rem]">
        <div className="self-stretch flex flex-row items-start justify-between gap-[2rem] shrink-0 text-black1 mq675:gap-[1rem] mq675:flex-wrap">
          <Loan home22="/loan.svg" loanRequests="Total no of loan provided" />
          <Loan home22="/recovered.svg" loanRequests="Recovered from Clients" />
          <Loan home22="/unrecovered.svg" loanRequests="Unrecovered from Clients" />
          
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-start justify-between gap-y-[2rem] shrink-0 text-black1 mq675:gap-[1rem] mq675:flex-wrap">
          <LoanDetails component={Apartment} label={"Property Loan"}/>
          <LoanDetails component={Time} label={"Business Loan"}/>
          <LoanDetails component={Hr} label={"Instant Loan"}/>
          <LoanDetails component={Briefcase} label={"Personal Loan"}/>
        </div>        
      </div>
    </div>
  )
}

export default LoanInfo