import React, { useState } from 'react';
import InputComponent from '../../components/InputComponent';
import RedButton from '../../../user/DesignSystem/RedButton';
import axiosInstance from '../../../../axios.utils';

function AddAgent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    Name: '',
    Number: '',
    Birth: '',
    Mail: '',
    Pan_Number: '',
    Aadhar_Number: '',
    Address: {
      Address: {
        1: '',  // Address Line 1
        2: '',  // Address Line 2
      },
      City: '',
      State: '',
      Zip: '',
    },
  });

  // Handle input change for both nested and top-level fields
  const handleInputChange = (field, value) => {
    const fieldParts = field.split('.');
    if (fieldParts.length === 3) {
      // For deep nested values like Address.Address.1 or Address.Address.2
      const [parent, child, subChild] = fieldParts;
      setData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: {
            ...prev[parent][child],
            [subChild]: value,
          },
        },
      }));
    } else if (fieldParts.length === 2) {
      // For nested values like Address.City or Address.State
      const [parent, child] = fieldParts;
      setData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      // For top-level values like Name, Phone, etc.
      setData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Validation
  const isFormValid = () => {
    const { Name, Number, Birth, Mail, Pan_Number, Aadhar_Number, Address } = data;
    return (
      Name &&
      Number &&
      Birth &&
      Mail &&
      Pan_Number &&
      Aadhar_Number &&
      Address.Address['1'] &&  // Ensure Address Line 1 is filled
      Address.Address['2'] &&  // Ensure Address Line 2 is filled
      Address.City &&
      Address.State &&
      Address.Zip
    );
  };

  const assignAgent = async () => {
    if (!isFormValid()) {
      alert('Please fill all fields.');
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post('/admin/classic/Agent/Add', {
        data: {
          ...data,  // Send the correct data structure
        },
      });
      alert('Agent assigned successfully!');
    } catch (error) {
      console.error('Error assigning agent:', error);
    //   alert('Failed to assign agent.');
      alert(error.response.data.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto flex flex-col items-start justify-start px-4 py-8 w-[calc(100%_-_344px)] text-left text-white font-inter mq850:max-w-full">
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        {/* Personal Details Section */}
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">
            Personal Details
          </div>
          <div className="grid grid-cols-3 mq675:grid mq675:grid-cols-2 w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label="Name" value={data.Name} onChange={(e) => handleInputChange('Name', e.target.value)} />
            <InputComponent label="Phone No" value={data.Number} onChange={(e) => handleInputChange('Number', e.target.value)} />
            <InputComponent label="Date of Birth" type="date" value={data.Birth} onChange={(e) => handleInputChange('Birth', e.target.value)} />
            <InputComponent label="Email ID" value={data.Mail} onChange={(e) => handleInputChange('Mail', e.target.value)} />
          </div>
        </div>

        {/* Address Section */}
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">
            Address Details
          </div>
          <div className="grid grid-cols-3 mq675:grid mq675:grid-cols-2 w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label="Address Line 1" value={data.Address.Address['1']} onChange={(e) => handleInputChange('Address.Address.1', e.target.value)} />
            <InputComponent label="Address Line 2" value={data.Address.Address['2']} onChange={(e) => handleInputChange('Address.Address.2', e.target.value)} />
            <InputComponent label="City" value={data.Address.City} onChange={(e) => handleInputChange('Address.City', e.target.value)} />
            <InputComponent label="State" value={data.Address.State} onChange={(e) => handleInputChange('Address.State', e.target.value)} />
            <InputComponent label="Zip" value={data.Address.Zip} onChange={(e) => handleInputChange('Address.Zip', e.target.value)} />
          </div>
        </div>

        {/* Government ID Details Section */}
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <div className="tracking-tight leading-[150%] text-slate-800 font-semibold text-[20px] whitespace-pre-wrap mq450:text-[1rem] mq450:leading-[1.5rem]">
            Government ID's Details
          </div>
          <div className="grid grid-cols-3 mq675:grid mq675:grid-cols-2 w-full items-start justify-between gap-4 text-[1rem] text-gray-400 font-roboto">
            <InputComponent label="PAN No" value={data.Pan_Number} onChange={(e) => handleInputChange('Pan_Number', e.target.value)} />
            <InputComponent label="Aadhar No" value={data.Aadhar_Number} onChange={(e) => handleInputChange('Aadhar_Number', e.target.value)} />
          </div>
        </div>

        {/* Assign Agent Button */}
        <div className="flex flex-row w-full justify-end">
          <RedButton label="Assign Agent" onClick={assignAgent} loading={loading} disabled={!isFormValid() || loading} />
        </div>
      </div>
    </div>
  );
}

export default AddAgent;
