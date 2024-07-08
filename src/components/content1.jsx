import PropTypes from "prop-types";

export const Content1 = ({ className = "" }) => {
  return (
    <div
      className={`flex-[0.832] rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl bg-white overflow-hidden flex flex-col items-start justify-start pt-[4.125rem] px-[4.125rem] pb-[2rem] box-border gap-[5.906rem] min-w-[22.688rem] max-w-full text-left text-[2.25rem] text-black font-inter mq450:gap-[1.5rem] mq450:min-w-full mq700:gap-[2.938rem] mq700:pl-[2.063rem] mq700:pr-[2.063rem] mq700:box-border mq925:flex-1 mq925:pt-[2.688rem] mq925:pb-[6.75rem] mq925:box-border ${className}`}
    >
      <div className="relative font-semibold inline-block min-w-[8.063rem] mq450:text-[1.375rem] mq925:text-[1.813rem]">
        Join Us
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0.187rem] pl-[2.062rem] box-border max-w-full">
        <div className="flex-1 flex flex-col items-start justify-start gap-[2.5rem] max-w-full mq450:gap-[1.25rem]">
          <div className="w-[22.5rem] flex flex-row items-start justify-center py-[0rem] px-[1.25rem] box-border max-w-full">
            <img
              className="h-[9.375rem] w-[9.375rem] relative object-cover"
              loading="lazy"
              alt=""
              src="/sn.png"
            />
          </div>
          <div className="relative font-medium mq450:text-[1.375rem] mq925:text-[1.813rem]">
            Subandhan Nidhi Bank
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-center">
        <button className="cursor-pointer [border:none] py-[0.25rem] px-[0.75rem] bg-royalblue rounded flex flex-row items-start justify-start gap-[0.25rem]">
          <div className="flex flex-row items-start justify-start py-[0.625rem] px-[0.5rem]">
            <div className="relative text-[1.25rem] font-medium font-roboto text-whitesmoke text-left inline-block min-w-[7.5rem] mq450:text-[1rem]">
              Register Now
            </div>
          </div>
          <div className="flex flex-col items-start justify-start pt-[0.593rem] px-[0rem] pb-[0rem]">
            <img
              className="w-[1.5rem] h-[1.5rem] relative overflow-hidden shrink-0"
              alt=""
              src="/arrowright.svg"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

Content1.propTypes = {
  className: PropTypes.string,
};

