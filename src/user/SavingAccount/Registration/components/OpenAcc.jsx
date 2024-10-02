import React, { useContext, useEffect, useState } from 'react';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import { Stepper, StepLabel, Step } from '@mui/material';
import { multiStepContext } from '../context/StepContext';
import { useUserSocket } from '../../../context/UserSocketContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../../../../LoadingIndicator/Loader';

function OpenAcc() {
  const { currentStep } = useContext(multiStepContext);
  const { user } = useUserSocket();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); // Loading state

  // Simulate 1-second loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 1 second
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);
  if (loading) {
    return (
      <Loader/>
    );
  }

  // Function to display the correct step component
  function showStep(step) {
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      default:
        return null;
    }
  }

  // If loading is true, show the loading message
  

  // If the user is not fetched or not verified, navigate to login
  if (!user || user?.Verification !== true) {
    return <Navigate to="/login" replace />;
  }

  // Render the steps if user is verified
  return (
    <div className="w-full relative bg-white overflow-y-auto flex flex-col items-end justify-start px-[4rem] box-border gap-[1.5rem] leading-[normal] tracking-[normal] mq750:pl-[2rem] mq750:pr-[2rem] mq750:box-border">
      <main className="self-stretch flex flex-row items-center justify-center gap-[2rem] max-w-full text-left text-[2rem] text-black1 font-roboto lg:flex-wrap mq750:flex-col mq750:gap-[1rem]">
        <div className="h-auto flex-1 relative rounded-3xl bg-whitesmoke box-border max-w-full border-[4px] border-solid border-white lg:flex-1 mq750:min-w-full">
          <img src='/login.svg' />
        </div>
        <div className='rounded-3xl box-border flex flex-col justify-between p-[58px] w-full border-[1px] border-solid border-foundation-white-normal-hover px-[4rem] gap-[32px]'>
          
            <div className="flex flex-col w-full items-start justify-start gap-[24px] mq750:gap-[1rem]">
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
              <div className="center-stepper w-full">
                <Stepper style={{ width: '100%' }} activeStep={currentStep - 1} orientation="horizontal">
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
              {showStep(currentStep)}
            </div>
          
        </div>
      </main>
    </div>
  );
}

export default OpenAcc;
