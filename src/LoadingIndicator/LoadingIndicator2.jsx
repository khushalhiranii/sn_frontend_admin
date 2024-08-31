import React from 'react';
import { useLoading } from './LoadingContext';

const LoadingIndicator2 = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loading-indicator">
      <div className="spinner2"></div>
    </div>
  );
};

export default LoadingIndicator2;