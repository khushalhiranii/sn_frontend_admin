import ListItem from "./list-item";
import PropTypes from "prop-types";

const Section = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch bg-white flex flex-col items-center justify-center p-[4rem] box-border gap-[4rem] max-w-full text-left text-[1.125rem] text-foundation-red-normal font-roboto mq750:gap-[2rem] mq750:py-[2.625rem] mq750:px-[2rem] mq750:box-border mq450:gap-[1rem] ${className}`}
    >
      <div className="flex flex-col items-center justify-start gap-[0.75rem] max-w-full">
        <div className="relative font-medium text-lg inline-block min-w-[7.625rem]">
          OUR SERVICES
        </div>
        <h1 className="m-0 relative text-[2rem] leading-[150%] font-bold font-inherit text-black text-center mq750:text-[1.625rem] mq750:leading-[2.375rem] mq450:text-[1.188rem] mq450:leading-[1.813rem]">
          Online Banking at Your Fingertips
        </h1>
      </div>
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[3rem] max-w-full text-[1.5rem] text-black mq750:gap-[1.5rem]">
        <ListItem
          loan="/loans-user.svg"
          heading="Loans"
          personalLoan="Personal Loan"
          instantLoan="Instant Loan"
          propertyLoan="Property loan"
          businessLoanSelfEmployedP="Business Loan (Self Employed/Professional)"
        />
        <ListItem
          loan="/saving-user.svg"
          heading="Saving Account"
          personalLoan="Dedicated personal service"
          instantLoan="Specialist teams"
          propertyLoan="Tailored product"
          businessLoanSelfEmployedP={`Bank & savings accounts`}
        />
        <ListItem
          loan="/schemes-user.svg"
          heading="Schemes"
          personalLoan="Daily Deposit"
          instantLoan="Recurring Deposit"
          propertyLoan="Monthly Income"
          businessLoanSelfEmployedP="Fixed Deposit"
        />
      </div>
    </section>
  );
};

Section.propTypes = {
  className: PropTypes.string,
};

export default Section;
