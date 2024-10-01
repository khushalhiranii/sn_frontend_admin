import React from 'react'
import { Outlet } from "react-router-dom";


const Registration = () => {
  

  return (
    <div className="w-full relative bg-white overflow-y-auto flex flex-col items-end justify-start px-[4rem] box-border gap-[1.5rem] leading-[normal] tracking-[normal] mq750:pl-[2rem] mq750:pr-[2rem] mq750:box-border">
      <main className="self-stretch flex flex-row items-center justify-center gap-[2rem] w-full text-left text-[2rem] text-black1 font-roboto lg:flex-wrap mq750:flex-col mq750:gap-[1rem]">
        <div className="h-auto flex flex-col relative rounded-3xl bg-whitesmoke box-border items-center justify-center max-w-full border-[4px] border-solid border-white lg:flex-1 mq750:min-w-full">
          <img src='registration.svg' />
        </div>
        <div className="rounded-3xl bg-white box-border flex flex-col items-start justify-between p-[4rem] w-full border-[1px] border-solid border-foundation-white-normal-hover lg:flex-1 lg:min-h-[auto] mq750:pl-[1.938rem] mq750:pr-[1.938rem] mq750:box-border mq450:pt-[1.688rem] mq450:pb-[1.688rem] mq450:box-border mq1050:pt-[2.625rem] mq1050:pb-[2.625rem] mq1050:box-border">
          
          <Outlet/>
          
        </div>
      </main>
    </div>
  )
}
export default Registration;


