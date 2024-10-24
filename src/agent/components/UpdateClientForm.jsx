import React, { useState } from 'react';
import RedButton from '../../user/DesignSystem/RedButton';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../axios.utils';
import { useAgentSocket } from '../context/AgentSocketContext';

const UpdateClientForm = () => {
  const [isPaid, setIsPaid] = useState(true); // Default to Paid Client
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(true); // Default to Responded
  const [isFormValid, setIsFormValid] = useState(false); // Form validation state
  const navigate = useNavigate();
  const { agent } = useAgentSocket();

  const { userId, loanId } = useParams(); // Fetching URL params
  const pathParts = window.location.pathname.split('/'); 
  const basePath = pathParts.slice(0, -2).join('/');

  // Validate Paid Client form
  const validateForm = (amount, method, file) => {
    const isValid = !!(amount && method && file); // Ensure all fields are filled
    setIsFormValid(isValid);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
      validateForm(amount, paymentMethod, uploadedFile);
    }
  };

  // Submit form logic
  const handleSubmit = async () => {
    setLoading(true); // Start loading spinner
    try {
      if (isPaid) {
        // API call for Paid Client
        const formData = new FormData(); // Using FormData for file upload
        formData.append('Transaction', file);
        formData.append('Identifier', userId);
        formData.append('Amount', amount);
        formData.append('Reference', loanId);
        formData.append('Type', 'Loan');
        formData.append('Status', 'Credit');
        formData.append('Agent', agent.Identifier);

        await axiosInstance.post('/agent/classic/Transaction', formData);
      } else {
        // API call for Unpaid Client
        const behaviour = response ? 'Responded' : 'Unresponded';
        await axiosInstance.put('/agent/classic/Loan/Client/Behaviour', {
          data: {
            Loan: loanId,
            Behaviour: behaviour,
          },
        });
      }
      alert('Submitted to Admin Successfully!');
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Error submitting the form.');
    } finally {
      setLoading(false); // Stop loading spinner
      navigate(basePath)
    }
  };

  return (
    <div className="w-[50%] text-black flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-4">Update to Admin</h2>

      {/* Paid/Unpaid Client Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label className="mr-2 font-medium">Paid Client</label>
          <input
            type="checkbox"
            className="toggle-checkbox size-4"
            checked={isPaid}
            onChange={() => setIsPaid(true)}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2 font-medium">Unpaid Client</label>
          <input
            type="checkbox"
            className="toggle-checkbox size-4"
            checked={!isPaid}
            onChange={() => setIsPaid(false)}
          />
        </div>
      </div>

      {/* Conditional Form Fields */}
      {isPaid ? (
        <div className="flex flex-col gap-4">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium">Enter Amount Paid</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                validateForm(e.target.value, paymentMethod, file);
              }}
              className="w-[70%] border border-x-0 border-t-0 border-b-gray-400 border-b-2 p-2 mt-1 placeholder:text-black"
              placeholder="Enter amount paid"
              required
            />
          </div>

          {/* Payment Method Selection */}
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  validateForm(amount, e.target.value, file);
                }}
                className="mr-2"
              />
              Through Cash
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="online"
                checked={paymentMethod === 'online'}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  validateForm(amount, e.target.value, file);
                }}
                className="mr-2"
              />
              Through Online
            </label>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Upload Your Document</label>
            <div className="flex gap-4 p-4">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-block bg-[#FFEAB0] hover:bg-yellow-200 text-black px-4 py-2 rounded font-normal shadow-sm"
              >
                Upload the Document
              </label>
              {fileName && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: <span className="font-medium">{fileName}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
            <div className='text-lg font-semibold'>
                Did the client respond?
            </div>
            <div className="flex items-center justify-between">
            <div className="flex items-center">
                <label className="mr-2 font-medium">Responded</label>
                <input
                type="checkbox"
                className="toggle-checkbox size-4"
                checked={response}
                onChange={() => setResponse(!response)}
                />
            </div>
            <div className="flex items-center">
                <label className="mr-2 font-medium">Not Responded</label>
                <input
                type="checkbox"
                className="toggle-checkbox size-4"
                checked={!response}
                onChange={() => setResponse(!response)}
                />
            </div>
            </div>
        </div>
      )}

      {/* Submit Button */}
      <RedButton
        onClick={handleSubmit}
        disabled={isPaid && !isFormValid}
        className="w-full py-[12px] px-[24px]"
        label="Update to Admin"
        loading={loading}
      />
    </div>
  );
};

export default UpdateClientForm;
