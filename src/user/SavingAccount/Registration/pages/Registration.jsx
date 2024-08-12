import React from 'react'
import { Outlet } from "react-router-dom";


const Registration = () => {
  

  return (
    <div className="w-full relative bg-white overflow-y-auto flex flex-col items-end justify-start pt-[4rem] px-[4rem] pb-[0.5rem] box-border gap-[1.5rem] leading-[normal] tracking-[normal] mq750:pl-[2rem] mq750:pr-[2rem] mq750:box-border">
      <main className="self-stretch flex flex-row items-start justify-start gap-[2rem] max-w-full text-left text-[2rem] text-black1 font-roboto lg:flex-wrap mq750:flex-col mq750:gap-[1rem]">
        <div className="h-auto flex-1 relative rounded-3xl bg-whitesmoke box-border min-w-[26rem] max-w-full border-[4px] border-solid border-white lg:flex-1 mq750:min-w-full">
          <img src='sn.png'/>
        </div>
        <div className="flex-[0.8] rounded-3xl bg-white box-border flex flex-col items-start justify-between py-[4rem] px-[4rem] min-h-[34rem] max-w-full border-[1px] border-solid border-foundation-white-normal-hover lg:flex-1 lg:min-h-[auto] mq750:pl-[1.938rem] mq750:pr-[1.938rem] mq750:box-border mq450:pt-[1.688rem] mq450:pb-[1.688rem] mq450:box-border mq1050:pt-[2.625rem] mq1050:pb-[2.625rem] mq1050:box-border">
          
          <Outlet/>
          
        </div>
      </main>
      <div className="w-[6.25rem] h-[2rem] relative bg-white shrink-0" />
    </div>
  )
}
export default Registration;


