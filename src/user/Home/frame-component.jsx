import PropTypes from "prop-types";
import RedButton from "../DesignSystem/RedButton";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start py-[0rem] px-[4rem] box-border max-w-full mq750:pl-[2rem] mq750:pr-[2rem] mq750:box-border ${className}`}
    >
      <footer className="flex-1 flex flex-row flex-wrap items-start justify-start gap-[4rem] max-w-full text-left text-[3.375rem] text-black font-roboto mq750:gap-[2rem] mq450:gap-[1rem]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[2rem] min-w-[25.375rem] max-w-full mq750:gap-[1rem] mq750:min-w-full">
          <h1 className="m-0 relative text-inherit leading-[4.75rem] font-bold font-inherit mq750:text-[2.688rem] mq750:leading-[3.75rem] mq450:text-[2rem] mq450:leading-[2.813rem]">
            Get in Touch
          </h1>
          <div className="self-stretch flex flex-col items-start justify-start gap-[1.25rem] text-[1rem] text-gray-3">
            <input type="text" className="self-stretch rounded flex flex-row items-center justify-start py-[0.812rem] px-[1.25rem] gap-[0.625rem] border-[1px] border-solid border-foundation-blue-normal placeholder:text-black placeholder:font-normal placeholder:text-[16px]" placeholder="Name*"/>
            <input type="text" className="self-stretch rounded flex flex-row items-center justify-start py-[0.812rem] px-[1.25rem] gap-[0.625rem] border-[1px] border-solid border-foundation-blue-normal placeholder:text-black placeholder:font-normal placeholder:text-[16px]" placeholder="Email"/>
            <input type="text" className="self-stretch rounded flex flex-row items-center justify-start py-[0.812rem] px-[1.25rem] gap-[0.625rem] border-[1px] border-solid border-foundation-blue-normal placeholder:text-black placeholder:font-normal placeholder:text-[16px]" placeholder="Phone number *"/>
            <RedButton label={"SEND"} className="w-[100%] text-center"/>
          </div>
        </div>
        <div className="h-[24rem] flex-1 relative rounded-2xl bg-gainsboro min-w-[25.375rem] max-w-full mq750:min-w-full" />
      </footer>
    </section>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;