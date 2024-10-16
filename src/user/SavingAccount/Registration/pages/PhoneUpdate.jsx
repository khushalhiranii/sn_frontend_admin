import React, { useState } from 'react';
import RedButton from '../../../DesignSystem/RedButton';
import { useUserSocket } from '../../../context/UserSocketContext';
import axiosInstance from '../../../../../axios.utils';

function PhoneUpdate() {
  const { user } = useUserSocket(); // Get user data from context
  const [phone, setPhone] = useState(''); // State for phone input
  const [otp, setOtp] = useState(''); // State for OTP input
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const [error, setError] = useState(''); // State for displaying error messages
  const [loading, setLoading] = useState(false); // Loading state for buttons
  const [verified, setVerified] = useState(false); // Track if OTP is verified
  const [newNumber, setNewNumber] = useState(''); // State for new phone number
  const [newOtp, setNewOtp] = useState(''); // State for new OTP input
  const [newOtpSent, setNewOtpSent] = useState(false); // Track if OTP is sent
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Request OTP for verifying the current phone number
  const requestOTP = async () => {
    setLoading(true); // Set loading state to true
    setError('');
    try {
      if (phone !== user.Number) {
        setError('Entered phone number does not match the registered number.');
        setLoading(false);
        return;
      }
      const response = await axiosInstance.post('/client/classic/Code', {
        data: { Number: phone },
      });
      console.log(response);
      setOtpSent(true);
      setError('');
    } catch (error) {
      console.error('Error requesting OTP:', error);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Request OTP for verifying the new phone number
  const requestOTPForNewNumber = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/client/classic/Code', {
        data: { Number: newNumber },
      });
      console.log(response);
      setNewOtpSent(true);
      setError('');
    } catch (error) {
      console.error('Error requesting OTP:', error);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP for the current phone number
  const verifyOTP = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/client/classic/Code', {
        data: { Number: phone, Code: otp, Verify: true },
      });
      console.log(response);
      setVerified(true); // Mark OTP as verified
      setSuccessMessage('Phone number verified successfully!'); // Show success message
      setOtp(''); // Reset OTP input
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Invalid OTP. Please try again.');
      setOtp(''); // Reset OTP input after error
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP for the new phone number and update it
  const verifyOTPForNewNumber = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/client/classic/Code', {
        data: { Number: newNumber, Code: newOtp, Verify: true },
      });
      if (response.status === 200) {
        try {
          // Update phone number after successful verification
          const updateResponse = await axiosInstance.put('/client/classic/Update', {
            data: {
              Identifier: user?.Identifier,
              Key: 'Number',
              Value: newNumber,
            },
          });
          console.log(updateResponse);
          setSuccessMessage(`Phone number updated to ${newNumber}`); // Show success message
          setNewOtp('');
        } catch (error) {
          console.error('Error updating phone number:', error);
          setError('Failed to update phone number.');
        }
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Invalid OTP. Please try again.');
      setNewOtp(''); // Reset OTP input after error
    } finally {
      setLoading(false);
    }
  };

  // Initial view for verifying the current number
  if (!verified) {
    return (
      <div className="flex flex-col mt-[32px] gap-[16px]">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div className="flex flex-row gap-[16px]">
          <input
            className="border border-t-0 p-[8px] border-x-0 text-base"
            placeholder="Enter your current number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} // Handle phone input change
          />
          <button
            onClick={requestOTP}
            disabled={phone.length !== 10 || phone !== user.Number || loading} // Disable while loading or if conditions aren't met
            className={`flex px-[64px] py-[8px] text-base text-white rounded-[4px] font-medium ${
              phone.length === 10 && phone === user.Number && !loading
                ? 'bg-blue-700'
                : 'bg-[#B0CFF6]'
            }`}
          >
            {loading ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
          </button>
        </div>
        
        {otpSent && (
          <div className="flex flex-row gap-[16px]">
            <input
              className="border border-t-0 p-[8px] border-x-0 text-base"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)} // Handle OTP input change
            />
          </div>
        )}
        <RedButton
          label={loading ? 'Verifying...' : 'Submit'}
          onClick={verifyOTP}
          disabled={otp.length !== 4 || loading} // Disable while loading or if OTP length is incorrect
        />
        
      </div>
    );
  }

  // View for updating the phone number after verifying the current one
  return (
    <div className="flex flex-col mt-[32px] gap-[16px]">
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <div className="flex flex-row gap-[16px]">
        <input
          className="border border-t-0 p-[8px] border-x-0 text-base"
          placeholder="Enter your new number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)} // Handle new phone input change
        />
        <button
          onClick={requestOTPForNewNumber}
          disabled={newNumber.length !== 10 || loading} // Disable while loading or if new number is not 10 digits
          className={`flex px-[64px] py-[8px] text-base text-white rounded-[4px] font-medium ${
            newNumber.length === 10 && !loading ? 'bg-blue-700' : 'bg-[#B0CFF6]'
          }`}
        >
          {loading ? 'Sending...' : newOtpSent ? 'Resend OTP' : 'Send OTP'}
        </button>
      </div>
      
      {newOtpSent && (
        <div className="flex flex-row gap-[16px]">
          <input
            className="border border-t-0 p-[8px] border-x-0 text-base"
            placeholder="Enter OTP"
            value={newOtp}
            onChange={(e) => setNewOtp(e.target.value)} // Handle OTP input change
          />
        </div>
      )}
      <RedButton
        label={loading ? 'Verifying...' : 'Submit'}
        onClick={verifyOTPForNewNumber}
        disabled={newOtp.length !== 4 || loading} // Disable while loading or if OTP length is incorrect
      />
      
    </div>
  );
}

export default PhoneUpdate;
