
import { Outlet } from "react-router-dom";
import FrameComponent from "./Home/frame-component1";


const Landing = () => {
  return (
    <div className="relative bg-white flex flex-col items-start w-full justify-start pt-[0rem] px-[0rem] pb-[5rem] box-border leading-[normal] tracking-[normal] mq1275:h-auto">
      
      <FrameComponent />
      <div className="self-stretch pt-[84px] bg-white overflow-hidden shrink-0 flex flex-col items-start justify-start px-[0rem] pb-[.562rem] box-border mq750:pb-[11.5rem] mq750:box-border mq1275:pb-[17.688rem] mq1275:box-border">
        <Outlet/>
      </div>
    </div>
  );
};

export default Landing;