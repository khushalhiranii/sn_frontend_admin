import React from 'react'
import FrameComponent1 from './frame-component';
import Container1 from "./container1";
import Container2 from "./container";
import Container from "./container2";
import Section from "./section";
import SeamlessTransactions from "./seamless-transactions";
import Container3 from './Container3';

function Home () {
  return (
    <div><SeamlessTransactions />
    <Section />
    <section className="self-stretch bg-white overflow-hidden flex flex-col items-center justify-center p-[4rem] box-border gap-[4rem] max-w-full text-left text-[1.125rem] text-foundation-red-normal font-roboto mq750:gap-[2rem] mq750:py-[1.688rem] mq750:px-[2rem] mq750:box-border mq450:gap-[1rem] mq1100:pt-[2.625rem] mq1100:pb-[2.625rem] mq1100:box-border">
      <div className="flex flex-col items-center justify-start gap-[0.75rem] max-w-full">
        <div className="relative font-medium inline-block min-w-[5.5rem]">
          TRENDING
        </div>
        <h1 className="m-0 relative text-[2rem] leading-[150%] font-bold font-inherit text-black text-center mq750:text-[1.625rem] mq750:leading-[2.375rem] mq450:text-[1.188rem] mq450:leading-[1.813rem]">
          Our Most Applied Loans
        </h1>
      </div>
      <div className="self-stretch flex flex-col items-center justify-center gap-[3rem] max-w-full mq750:gap-[1.5rem]">
        <Container
          placeholderImage="/businessLoan.png"
          heading="Business Loan"
        />
        <Container1
          heading="Instant Loan"
          placeholderImage="/instantLoan.png"
        />
      </div>
    </section>
    <section className="self-stretch bg-white overflow-hidden flex flex-col items-center justify-center p-[4rem] box-border gap-[4rem] max-w-full text-left text-[1.125rem] text-foundation-red-normal font-roboto mq750:gap-[2rem] mq750:py-[1.688rem] mq750:px-[2rem] mq750:box-border mq450:gap-[1rem] mq1100:pt-[2.625rem] mq1100:pb-[2.625rem] mq1100:box-border">
      <div className="flex flex-col items-center justify-start gap-[0.75rem] max-w-full">
        <div className="relative font-medium inline-block min-w-[5.5rem]">
          TRENDING
        </div>
        <h1 className="m-0 relative text-[2rem] leading-[150%] font-bold font-inherit text-black text-center mq750:text-[1.625rem] mq750:leading-[2.375rem] mq450:text-[1.188rem] mq450:leading-[1.813rem]">
          Our Most Applied Schemes
        </h1>
      </div>
      <div className="self-stretch flex flex-col items-center justify-center gap-[3rem] max-w-full mq750:gap-[1.5rem]">
        <Container
          placeholderImage="/fixedDeposit.png"
          heading="Fixed Deposit"
        />
        <Container1
          heading="Recurring Deposit"
          placeholderImage="/recurringDeposit.png"
        />
      </div>
    </section>
    <section className="self-stretch flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[4rem] box-border max-w-full text-left text-[1.125rem] text-foundation-red-normal font-roboto mq450:pb-[1.688rem] mq450:box-border mq1100:pb-[2.625rem] mq1100:box-border">
      <div className="flex-1 bg-white overflow-hidden flex flex-col items-center justify-center p-[4rem] box-border gap-[4rem] max-w-full mq750:gap-[2rem] mq750:pl-[2rem] mq750:pr-[2rem] mq750:box-border mq450:gap-[1rem] mq450:pt-[1.688rem] mq450:pb-[1.688rem] mq450:box-border mq1100:pt-[2.625rem] mq1100:pb-[2.625rem] mq1100:box-border">
        <div className="flex flex-col items-center justify-start gap-[0.75rem]">
          <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[3.688rem]">
            ABOUT
          </a>
          <h1 className="m-0 relative text-[2rem] leading-[150%] font-bold font-inherit text-black text-center mq750:text-[1.625rem] mq750:leading-[2.375rem] mq450:text-[1.188rem] mq450:leading-[1.813rem]">
            Subandhan Nidhi
          </h1>
        </div>
        <Container2 placeholderImage="/fixedDeposit.png" />
        <Container3  placeholderImage="/recurringDeposit.png" />
      </div>
    </section>
    <FrameComponent1 /></div>
  )
}

export default Home;