import React, { useState } from 'react';
import RedButton from '../../../DesignSystem/RedButton';
import { useUserSocket } from '../../../context/UserSocketContext';
import axiosInstance from '../../../../../axios.utils';

function MpinUpdate() {
  const { user } = useUserSocket(); // Get user data from context
  const [phone, setPhone] = useState(''); // State for phone input
  const [otp, setOtp] = useState(''); // State for OTP input
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const [error, setError] = useState(''); // State for displaying error messages
  const [loading, setLoading] = useState(false); // Loading state for buttons
  const [verified, setVerified] = useState(false); // Track if OTP is verified
  const [newMpin, setMpin] = useState(''); // State for new M-Pin
  const [reenter, setReenter] = useState(''); // State for re-entered M-Pin
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

  // Update M-Pin
  const updateMpin = async () => {
    if (newMpin !== reenter) {
      setError("Re-entered M-Pin doesn't match the new M-Pin.");
      return;
    }

    setLoading(true);
    setError('');
    console.log(newMpin)
    try {
      const updateResponse = await axiosInstance.put('/client/classic/Update', {
        data: {
          "Identifier": user?.Identifier,
          "Key": "Password",
          "Value": newMpin,
        },
      });
      console.log(updateResponse);
      setSuccessMessage('M-Pin updated successfully!'); // Show success message
      setMpin(''); // Clear new M-Pin input
      setReenter(''); // Clear re-entered M-Pin input
    } catch (error) {
      console.error('Error updating M-Pin', error);
      setError('Failed to update M-Pin.');
    } finally {
      setLoading(false);
    }
  };

  // Initial view for verifying the current number
  if (!verified) {
    return (
      <div className="flex flex-col mt-[32px] gap-[16px]">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-row gap-[16px]">
          <input
            className="border border-t-0 p-[8px] border-x-0 text-base"
            placeholder="Enter your number"
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
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
    );
  }

  // View for updating the M-Pin after verifying the current one
  return (
    <div className="flex flex-col mt-[32px] gap-[16px]">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      <div className="flex flex-row gap-[16px]">
        <input
          type="password"
          maxLength={4} // Limit input to 4 digits
          className="border border-t-0 p-[8px] border-x-0 text-base text-center"
          placeholder="Enter your new M-Pin"
          value={newMpin}
          onChange={(e) => setMpin(e.target.value)} // Handle new M-Pin input change
        />
      </div>
      
      <div className="flex flex-row gap-[16px]">
        <input
          type="password"
          maxLength={4} // Limit input to 4 digits
          className="border border-t-0 p-[8px] border-x-0 text-base text-center"
          placeholder="Re-enter new M-Pin"
          value={reenter}
          onChange={(e) => {setReenter(e.target.value)}} // Handle re-entered M-Pin input change
        />
      </div>
      <RedButton
        label={loading ? 'Updating...' : 'Update M-Pin'}
        onClick={updateMpin}
        disabled={newMpin.length !== 4 || loading} // Disable while loading or if new M-Pin length is incorrect
      />
      
    </div>
  );
}

export default MpinUpdate;
