import PropTypes from "prop-types";

const Main = ({ className = "" }) => {
  return (
    <div
      className={`w-full flex flex-row items-start justify-start gap-[11px] leading-[normal] tracking-[normal] text-left text-5xl text-black font-roboto ${className}`}
    >
      <img
        className="h-12 w-12 relative object-cover"
        loading="lazy"
        alt=""
        src="/rectangle-8361@2x.png"
      />
      <div className="flex flex-col items-start justify-start pt-2.5 px-0 pb-0">
        <a className="[text-decoration:none] relative font-medium text-[inherit]">
          Subandhan Nidhi
        </a>
      </div>
    </div>
  );
};

Main.propTypes = {
  className: PropTypes.string,
};

export default Main;