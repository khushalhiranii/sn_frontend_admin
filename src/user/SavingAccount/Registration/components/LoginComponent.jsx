import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router's useNavigate hook
import { useUserData } from '../context/UserDataContext';
import { Login } from '../../../Login/Login';
import { Otp } from './otp';
import { OtpVerified } from './OtpVerfied';
import { useUserSocket } from '../../../context/UserSocketContext';

function LoginComponent() {
    const { loginView } = useUserData();
    const { user = {} } = useUserSocket(); // Ensure user is always an object
    const navigate = useNavigate(); // Initialize the navigate function

    // Convert user object to an array safely
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

    // Render the appropriate login view based on loginView state
    switch (loginView) {
        case 'login':
            return <Login />;
        case 'otp':
            return <Otp />;
        case 'verified':
            return <OtpVerified />;
        default:
            return null; // Handle unexpected cases gracefully
    }
}

export default LoginComponent;
