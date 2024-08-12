import PropTypes from "prop-types";

const Container2 = ({ className = "", placeholderImage }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-center justify-start relative gap-[4rem] max-w-full text-center text-[1rem] text-black font-roboto mq750:gap-[2rem] mq450:gap-[1rem] ${className}`}
    >
      <img
        className="w-[39rem] relative rounded-2xl max-h-full object-cover max-w-full"
        alt=""
        src={placeholderImage}
      />
      <div className="w-[47rem] !m-[0] absolute top-[calc(50%_-_112px)] right-[0rem] shadow-[0px_8px_36px_rgba(0,_0,_0,_0.08)] rounded-2xl bg-white flex flex-row items-center justify-center p-[4rem] box-border max-w-full z-[1]">
        <div className="flex-1 relative leading-[150%] inline-block max-w-full">{`At Subandhan Nidhi, we are dedicated to empowering individuals and businesses alike by providing accessible and reliable financial solutions. With a commitment to integrity, transparency, and customer satisfaction, we strive to foster financial growth and stability within our community. `}</div>
      </div>
    </div>
  );
};

Container2.propTypes = {
  className: PropTypes.string,
  placeholderImage: PropTypes.string,
};

export default Container2;
