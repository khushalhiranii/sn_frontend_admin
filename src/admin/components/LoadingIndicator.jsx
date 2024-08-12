import React, { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const LoadingIndicator = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    handleStart();
    handleStop();

    return () => {
      NProgress.done();
    };
  }, [location, navigationType]);

  return null;
};

export default LoadingIndicator;
