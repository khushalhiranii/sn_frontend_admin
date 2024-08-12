import React from 'react';
import { useEffect, useRef, useState }
	from "react";
import { useUserData } from '../context/UserDataContext';
import { useNavigate } from 'react-router-dom';
import RedButton from '../../../DesignSystem/RedButton';

export const Otp = ({ length = 4
    // ,
	// onOtpSubmit = (nalotp) => { 
    //     console.log(nalotp)
    // } 
}) => {
        const [finalOtp, setFinalOtp] = useState('')
	const [otp, setOtp] = useState(
		new Array(length).fill(""));
	const inputRefs = useRef([]);

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	const handleChange = (index, e) => {
		const value = e.target.value;
		if (isNaN(value)) return;

		const newOtp = [...otp];
		// allow only one input
		newOtp[index] =
			value.substring(value.length - 1);
		setOtp(newOtp);

		// submit trigger
		const combinedOtp = newOtp.join("");
		if (combinedOtp.length === length){
			// onOtpSubmit(combinedOtp);
            setFinalOtp(combinedOtp);
        }

		// Move to next input if current field is filled
		if (value && index < length - 1 &&
			inputRefs.current[index + 1]) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleClick = (index) => {
		inputRefs.current[index].setSelectionRange(1, 1);

		// optional
		if (index > 0 && !otp[index - 1]) {
			inputRefs.current[otp.indexOf("")].focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (
			e.key === "Backspace" &&
			!otp[index] &&
			index > 0 &&
			inputRefs.current[index - 1]
		) {
			// Move focus to the previous input field on backspace
			inputRefs.current[index - 1].focus();
		}
	};


  const { sendOTP } = useUserData()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call sendUserData function from context
      console.log(finalOtp)
      const response = await sendOTP(finalOtp);
      console.log(response)
      if(response){
        navigate('/login/otpverified')
      }
      
      
      // Proceed to OTP verification step
      // Implement your logic here (e.g., navigate to OTP verification screen)
    } catch (error) {
      console.error('Failed to send user data:', error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    
	<div className='h-[896px] flex flex-col w-full'>
	<div className="flex flex-col w-full flex-grow gap-[32px] mq750:gap-[1rem]">
	  <div className="flex flex-row items-center justify-start gap-[1.5rem] mq450:flex-wrap">
		<img
		  className="h-[4rem] w-[4rem] relative rounded-981xl object-cover"
		  loading="lazy"
		  alt=""
		  src="/sn.svg"
		/>
		<div className="m-0 relative text-[32px] font-semibold mq450:text-[1.188rem] mq1050:text-[1.625rem]">
		  Phone Verification
		</div>
	  </div>
        <div className="flex flex-col justify-center gap-[24px]">
          <div className="flex justify-center gap-4">
          {otp.map((value, index) => {
				return (
					<input
						key={index}
						type="text"
						ref={(input) => (inputRefs.current[index] = input)}
						value={value}
						onChange={(e) => handleChange(index, e)}
						onClick={() => handleClick(index)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						className="w-9 h-10 text-2xl text-center border border-solid border-foundation-Violet-violet-100 rounded-md"
					/>
				);
			})}
          </div>
          <div className="flex flex-row text-center justify-center text-base font-normal">
            <p>Didn’t you receive the OTP?</p>
            <button className="bg-white text-foundation-red-normal font-medium hover:text-red-600">
              Resend Code
            </button>
          </div>
		</div>
		</div>
          <div className="self-stretch flex justify-end">
        <RedButton label={"Verify OTP"} onClick={handleSubmit} className={'w-[100%]'} />
      </div>
    </div>
    
  );
}

