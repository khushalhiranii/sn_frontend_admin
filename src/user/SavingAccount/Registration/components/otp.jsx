import React, { useEffect, useRef, useState } from "react";
import { useUserData } from '../context/UserDataContext';
import { useNavigate } from 'react-router-dom';
import RedButton from '../../../DesignSystem/RedButton';
import { useUserSocket } from '../../../context/UserSocketContext';

export const Otp = ({ length = 4 }) => {
    const [finalOtp, setFinalOtp] = useState('');
    const { sendUserIdentifier } = useUserSocket();
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);
    const { sendOTP, sendLoginOTP } = useUserData();
    const [loading, setLoading] = useState(false); // Loading state
    const [errorMessage, setErrorMessage] = useState(''); // Error message state
	const navigate = useNavigate();
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const currentPath = window.location.pathname;
    const hasLoginInPath = currentPath.includes('login');

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) {
            setFinalOtp(combinedOtp);
        }

        if (value && index < length - 1 && inputRefs.current[index + 1]) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submitting
        setErrorMessage(''); // Reset error message

        try {
            let response;
            if (hasLoginInPath) {
                response = await sendLoginOTP(finalOtp);
                sendUserIdentifier(response.data.credentials.Identifier);
            } else {
                response = await sendOTP(finalOtp);
            }

            if (response) {
                navigate('/register/otpverified');
            }
        } catch (error) {
            console.error('Failed to verify OTP:', error.message);
            setErrorMessage(error.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false); // Set loading to false after request completes
        }
    };

    return (
        <div className="h-[896px] flex flex-col w-full">
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
                        {otp.map((value, index) => (
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
                        ))}
                    </div>
                    <div className="flex flex-row text-center justify-center text-base font-normal">
                        <p>Didn’t you receive the OTP?</p>
                        <button className="bg-white text-foundation-red-normal font-medium hover:text-red-600">
                            Resend Code
                        </button>
                    </div>
                    {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
                </div>
            </div>
            <div className="self-stretch flex justify-end">
                <RedButton
                    label="Verify OTP"
                    onClick={handleSubmit}
                    className="w-[100%]"
                    loading={loading} // Pass loading state to RedButton
                    disabled={loading || finalOtp.length != 4} // Disable button while loading
                />
            </div>
        </div>
    );
};
