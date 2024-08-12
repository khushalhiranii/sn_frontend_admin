import React, { useContext } from 'react'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import { Stepper, StepLabel, Step } from '@mui/material';
import { multiStepContext } from '../context/StepContext';

function OpenAcc() {

    const { currentStep, finalData } = useContext(multiStepContext)
    function showstep(step) {
        switch(step){
            case 1:
                return <FirstStep/>
            case 2:
                return <SecondStep/>
            case 3:
                return <ThirdStep/>
        }
    }
  return (
    <div className='h-[896px] flex flex-col w-full'>
      <div className="flex flex-col w-full items-start justify-start gap-[32px] mq750:gap-[1rem]">
        <div className="flex flex-row items-center justify-center gap-[1.5rem] mq450:flex-wrap">
          <img
            className="h-[4rem] w-[4rem] relative rounded-981xl object-cover"
            loading="lazy"
            alt=""
            src="/sn.svg"
          />
          <div className="m-0 relative text-[32px] font-semibold mq450:text-[1.188rem] mq1050:text-[1.625rem]">
            Open Saving Account
          </div>
        </div>
        <div className='center-stepper w-full'>
            <Stepper style={{width: '100%'}} activeStep={currentStep-1} orientation='horizontal' >
                <Step>
                    <StepLabel></StepLabel>
                </Step>
                <Step>
                    <StepLabel></StepLabel>
                </Step>
                <Step>
                    <StepLabel></StepLabel>
                </Step>
            </Stepper>
        </div>
            {showstep(currentStep)}
        </div>
    </div>
  )
}

export default OpenAcc