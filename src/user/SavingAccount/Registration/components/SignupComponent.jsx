import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router's useNavigate hook
import { useUserData } from '../context/UserDataContext';
import { Otp } from './otp';
import { OtpVerified } from './OtpVerfied';
import { useUserSocket } from '../../../context/UserSocketContext';
import { Inputbar } from './Inputbar';

function SignupComponent() {
    const { signupView } = useUserData();
    const { user = {} } = useUserSocket(); // Ensure user is always an object
    const navigate = useNavigate(); // Initialize the navigate function

    const userArray = Object.values(user || {});

    // Redirect if user is already logged in
    useEffect(() => {
        if (userArray.length !== 0) {
            navigate('/'); // Redirect to home or dashboard
        }
    }, [userArray, navigate]); // Watch userArray for changes

    // Avoid rendering login if user is logged in
    if (userArray.length !== 0) {
        return null;
    }

    switch (signupView) {
        case 'signup':
            return <Inputbar />;
        case 'otp':
            return <Otp />;
        case 'verified':
            return <OtpVerified />;
        default:
            return null; // Optional: Handle unexpected states
    }
}

export default SignupComponent;
