import PropTypes from "prop-types";

const Loan = ({ className = "", home22, loanRequests, count=0 }) => {
  return (
    <div
      className={`loan-component w-full rounded bg-off-white flex flex-row justify-between pl p-[12px] box-border min-w-[9.5rem] text-left text-[1rem] text-black1 font-roboto ${className}`}
    >
      <div className="flex flex-col items-center justify-end pt-[0rem] px-[0rem]">
        <div className="flex flex-col items-stretch justify-center gap-[0.25rem]">
          <div className="relative font-medium inline-block min-w-[6.688rem]">
            {loanRequests}
          </div>
          <div className="relative text-[1.313rem] font-medium inline-block min-w-[0.75rem] mq450:text-[1.063rem]">
            {count}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-[1.25rem]">
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
  );
};

Loan.propTypes = {
  className: PropTypes.string,
  home22: PropTypes.string,
  loanRequests: PropTypes.string,
};

export default Loan;
