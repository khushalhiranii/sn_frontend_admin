import PropTypes from "prop-types";
import RedButton from "../DesignSystem/RedButton";

const SeamlessTransactions = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start p-[64px] box-border max-w-full text-left text-[3rem] text-foundation-red-normal font-roboto mq750:pl-[2rem] mq750:pr-[2rem] mq750:pb-[2.625rem] mq750:box-border ${className}`}
    >
      <div className="flex-1 flex flex-row items-start justify-start gap-[64px] max-w-full mq750:gap-[2rem] mq450:gap-[1rem] mq1275:flex-wrap">
        <div className="w-[35rem] flex flex-col items-start justify-start pt-[4rem] px-[0rem] pb-[0rem] box-border min-w-[35rem] max-w-full mq750:min-w-full mq450:pt-[2.625rem] mq450:box-border mq1275:flex-1">
          <div className="self-stretch flex flex-col items-start justify-start gap-[2rem] max-w-full mq750:gap-[1rem]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[0.687rem] max-w-full">
              <h1 className="m-0 self-stretch relative text-inherit font-medium font-inherit mq750:text-[2.375rem] mq450:text-[1.813rem]">
                Experience the ease of seamless transactions with us
              </h1>
              <div className="w-[33rem] relative text-[1rem] font-medium font-inter text-black inline-block max-w-full">
                Banking experience has never been this easy before, start your
                journey now and see the difference.
              </div>
            </div>
            <RedButton label={"Get Started"} onClick={()=>{}}/>
          </div>
        </div>
        <div className="h-[26.625rem] flex-1 relative rounded-2xl bg-off-white min-w-[27.938rem] max-w-full mq750:min-w-full" />
      </div>
    </section>
  );
};

SeamlessTransactions.propTypes = {
  className: PropTypes.string,
};

export default SeamlessTransactions;