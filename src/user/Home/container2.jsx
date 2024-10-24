import PropTypes from "prop-types";
import RedButton from "../DesignSystem/RedButton";

const Container = ({ className = "", placeholderImage, heading }) => {
  return (
    <div
      className={`self-stretch flex flex-row flex-wrap items-center justify-start gap-[4rem] max-w-full text-left text-[1rem] text-text-primary font-roboto mq750:gap-[2rem] mq450:gap-[1rem] ${className}`}
    >
      <img
        className="h-[19.75rem] flex-1 relative rounded-2xl max-w-full overflow-hidden object-cover min-w-[25.375rem] mq750:min-w-full"
        alt=""
        src={placeholderImage}
      />
      <div className="flex-1 flex flex-col items-start justify-start py-[1.25rem] px-[0rem] box-border gap-[1.5rem] min-w-[25.375rem] max-w-full mq750:min-w-full">
        <h1 className="m-0 self-stretch relative text-[2.5rem] leading-[120%] font-bold font-inherit mq750:text-[2rem] mq750:leading-[2.375rem] mq450:text-[1.5rem] mq450:leading-[1.813rem]">
          {heading}
        </h1>
        <div className="self-stretch relative leading-[150%] text-gray">
          Empower your business dreams with our flexible and tailored business
          loan solutions. Unlock growth opportunities today with our competitive
          rates and expert support
        </div>
        <RedButton label={"Explore more"} onClick={()=>{}}/>
      </div>
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  placeholderImage: PropTypes.string,
  heading: PropTypes.string,
};

export default Container;
