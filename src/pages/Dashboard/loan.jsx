import PropTypes from "prop-types";

const Loan = ({ className = "", home22, loanRequests }) => {
  return (
    <div
      className={`flex-1 rounded bg-off-white overflow-hidden flex flex-row items-end justify-start pt-[0rem] px-[0.75rem] pb-[0.125rem] box-border min-w-[9.5rem] text-left text-[1rem] text-black1 font-roboto ${className}`}
    >
      <div className="ml-[-1.688rem] h-[4.5rem] w-[14.813rem] flex flex-row items-end justify-between gap-[1.25rem]">
        <div className="self-stretch w-[0.75rem] relative bg-foundation-red-normal" />
        <div className="h-[3.75rem] w-[3.125rem] flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.625rem] box-border">
          <div className="self-stretch flex-1 flex flex-row items-center justify-center p-[0.75rem]">
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src={home22}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.687rem] ml-[-13.125rem]">
        <div className="flex flex-col items-start justify-start gap-[0.25rem]">
          <div className="relative font-medium inline-block min-w-[6.688rem]">
            {loanRequests}
          </div>
          <div className="relative text-[1.313rem] font-medium inline-block min-w-[0.75rem] mq450:text-[1.063rem]">
            8
          </div>
        </div>
      </div>
    </div>
  );
};

Loan.propTypes = {
  className: PropTypes.string,
  home22: PropTypes.string,
  loanRequests: PropTypes.string,
};

export default Loan;