import PropTypes from "prop-types";

const ListItem = ({
  className = "",
  loan,
  heading,
  personalLoan,
  instantLoan,
  propertyLoan,
  businessLoanSelfEmployedP,
}) => {
  return (
    <div
      className={`flex-1 rounded-xl bg-white box-border flex flex-col items-start justify-start py-[1.375rem] pr-[1.25rem] pl-[1.5rem] gap-[1.5rem] min-w-[19rem] max-w-full text-left text-[1.5rem] text-black font-roboto border-[1px] border-solid border-foundation-white-light-active ${className}`}
    >
      <img
        className="w-[3rem] h-[3rem] relative overflow-hidden shrink-0"
        loading="lazy"
        alt=""
        src={loan}
      />
      <h3 className="m-0 relative text-inherit leading-[2.125rem] font-extrabold font-inherit inline-block min-w-[4.125rem] mq450:text-[1.188rem] mq450:leading-[1.688rem]">
        {heading}
      </h3>
      <div className="self-stretch relative text-[1rem] leading-[150%]">
        <ul className="m-0 font-inherit text-inherit pl-[1.312rem]">
          <li>{personalLoan}</li>
          <li>{instantLoan}</li>
          <li>{propertyLoan}</li>
          <li>{businessLoanSelfEmployedP}</li>
        </ul>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  className: PropTypes.string,
  loan: PropTypes.string,
  heading: PropTypes.string,
  personalLoan: PropTypes.string,
  instantLoan: PropTypes.string,
  propertyLoan: PropTypes.string,
  businessLoanSelfEmployedP: PropTypes.string,
};

export default ListItem;