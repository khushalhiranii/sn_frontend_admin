import React, { useState, useEffect } from 'react';
import RedButton from '../../../DesignSystem/RedButton';
import { useUserSocket } from '../../../context/UserSocketContext';
import axiosInstance from '../../../../../axios.utils';

function DetailsInput({ label, value, onChange }) {
    return (
        <div className="flex flex-col gap-[4px] w-full">
            <label>{label}</label>
            <input
                className="border border-t-0 p-[8px] border-x-0 text-base"
                value={value}
                onChange={onChange} // Handle input change
            />
        </div>
    );
}

function DetailsUpdate() {
  const { user, userData } = useUserSocket(); // Get user data from context
  const [details, setDetails] = useState({
    Employment: '',
    Salary: '',
    Address: {
      Address1: '',
      Address2: '',
      State: '',
      City: '',
      Zip: ''
    }
  }); // State for storing updated details
  const [loading, setLoading] = useState(false); // Loading state for buttons
  const [error, setError] = useState(''); // State for displaying error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Initialize the form with socket data
  useEffect(() => {
    if (userData) {
      setDetails({
        Employment: userData.Employment,
        Salary: userData.Salary,
        Address: {
          Address1: userData.Address?.Address[1] || '',
          Address2: userData.Address?.Address[2] || '',
          State: userData.Address?.State || '',
          City: userData.Address?.City || '',
          Zip: userData.Address?.Zip || ''
        }
      });
    }
  }, [userData]);

  // Handle input changes and update state
  const handleChange = (field, value) => {
    setDetails(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  // Handle address changes separately
  const handleAddressChange = (field, value) => {
    setDetails(prevState => ({
      ...prevState,
      Address: {
        ...prevState.Address,
        [field]: value
      }
    }));
  };

  // Update details
  const updateDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const updateResponse = await axiosInstance.put('/client/classic/Datas', {
        data: {
          "Identifier": user?.Identifier,
          "Keys": ["Employment", "Salary", "Address"],
          "Values": [
            details.Employment,
            details.Salary,
            {
              "Address": {
                "1": details.Address.Address1,
                "2": details.Address.Address2
              },
              "City": details.Address.City,
              "State": details.Address.State,
              "Zip": details.Address.Zip
            }
          ]
        }
      });
      console.log(updateResponse);
      setSuccessMessage('Details updated successfully!'); // Show success message
    } catch (error) {
      console.error('Error updating Details', error);
      setError('Failed to update Details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-[32px] gap-[16px] w-full">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        
        {/* Employment Input */}
        <DetailsInput
          label={"Employment Type"}
          value={details.Employment}
          onChange={(e) => handleChange('Employment', e.target.value)}
        />
        
        {/* Income Input */}
        <DetailsInput
          label={"Income"}
          value={details.Salary}
          onChange={(e) => handleChange('Salary', e.target.value)}
        />
        
        {/* Address Inputs */}
        <DetailsInput
          label={"Address Line 1"}
          value={details.Address.Address1}
          onChange={(e) => handleAddressChange('Address1', e.target.value)}
        />
        <DetailsInput
          label={"Address Line 2"}
          value={details.Address.Address2}
          onChange={(e) => handleAddressChange('Address2', e.target.value)}
        />
        <DetailsInput
          label={"State"}
          value={details.Address.State}
          onChange={(e) => handleAddressChange('State', e.target.value)}
        />
        <DetailsInput
          label={"City"}
          value={details.Address.City}
          onChange={(e) => handleAddressChange('City', e.target.value)}
        />
        <DetailsInput
          label={"Zip Code"}
          value={details.Address.Zip}
          onChange={(e) => handleAddressChange('Zip', e.target.value)}
        />
        
        {/* Update Button */}
        <RedButton
          label={loading ? 'Updating...' : 'Update Info'}
          onClick={updateDetails}
          disabled={loading} // Disable while loading
        />
    </div>
  );
}

export default DetailsUpdate;
