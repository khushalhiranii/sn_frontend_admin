import React, { useContext, useState, useEffect, useRef } from 'react';
import { multiStepContext } from '../context/StepContext';
import InputReg from '../../../DesignSystem/InputReg';
import RedButton from '../../../DesignSystem/RedButton';
import axiosInstance from '../../../../../axios.utils';
import { useNavigate } from 'react-router-dom';

const ThirdStep = () => {
  const [panNumber, setPanNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [aadharCardFile, setAadharCardFile] = useState(null);
  const [panCardFile, setPanCardFile] = useState(null);
  const [userPhotoFile, setUserPhotoFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [apiRes, setApiRes] = useState(false);
  const [finalRes, setFinalRes] = useState("");
  const navigate = useNavigate();

  const [uploadAttempted, setUploadAttempted] = useState({
    panCard: false,
    aadharCard: false,
    userPhoto: false,
    signature: false,
  });

  const [panError, setPanError] = useState(''); // PAN validation error
  const [aadharError, setAadharError] = useState(''); // Aadhar validation error

  const { submitData, userData, setUserData, setStep } = useContext(multiStepContext);

  const submit = async () => {
    try {
      setApiRes(true);
      const res = await submitData();
      if (res.status === 200) {
        setApiRes(false);
        setFinalRes(res.response.data.data.message);
        // navigate('/register/verified');
        setStep(4)
      }
    } catch (error) {
      setApiRes(error.response.data.data.message);
    }
  };

  const panCardInputRef = useRef(null);
  const aadharCardInputRef = useRef(null);
  const userPhotoInputRef = useRef(null);
  const signatureInputRef = useRef(null);

  useEffect(() => {
    if (panNumber && aadharNumber && aadharCardFile && panCardFile && userPhotoFile && signatureFile && !panError && !aadharError) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [panNumber, aadharNumber, aadharCardFile, panCardFile, userPhotoFile, signatureFile, panError, aadharError]);

  const handleFileChange = async (event, setFile, field, type) => {
    const file = event.target.files[0];
    const fileSizeLimit = 5 * 1024 * 1024; 

    setUploadError('');
    setUploadSuccess('');
    setUploadAttempted(prev => ({ ...prev, [type]: true })); 

    if (file.size > fileSizeLimit) {
      setUploadError('File size exceeds the 5MB limit.');
      return;
    }

    if (!['application/pdf', 'image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      setUploadError('Only image or PDF files are allowed.');
      return;
    }

    setFile(file);
    const formData = new FormData();
    formData.append('User-Docs', file);
    const Identifier = sessionStorage.getItem('Identifier');

    try {
      setLoading(true); 
      const response = await axiosInstance.post(`client/classic/Docs?Identifier=${Identifier}&Field=${field}`, formData);
      setLoading(false); 
      setUploadSuccess('File uploaded successfully.');
      console.log(response);
    } catch (error) {
      setLoading(false); 
      setUploadError('Error uploading the file. Please try again.');
      console.error(error);
    }
  };

  const handleRemoveFile = (setFile, type) => {
    setFile(null);
    setUploadSuccess(''); 
    setUploadAttempted(prev => ({ ...prev, [type]: false })); 
  };

  const handleViewImage = (file) => {
    window.open(URL.createObjectURL(file), '_blank');
  };

  const triggerFileInput = (inputRef) => {
    inputRef.current.click();
  };

  const validatePanNumber = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(pan)) {
      setPanError('Invalid PAN number. Format: 5 alphabets, 4 numbers, 1 alphabet.');
    } else {
      setPanError('');
    }
  };

  const validateAadharNumber = (aadhar) => {
    const aadharRegex = /^\d{12}$/;
    if (!aadharRegex.test(aadhar)) {
      setAadharError('Aadhar number must be 12 digits.');
    } else {
      setAadharError('');
    }
  };

  const renderUploadSection = (label, placeholder, value, onChange, file, setFile, inputRef, field, type) => (
    <div className="flex flex-col gap-[16px]">
      {(label === "Pan Card" || label === "Aadhar Card") && <InputReg
        label={label}
        type="text"
        placeholder={placeholder}
        value={value}
        onBlur={() => { if (label === 'Pan Card') validatePanNumber(value); if (label === 'Aadhar Card') validateAadharNumber(value); }} 
        onChange={onChange}
      />}
      {label === "Pan Card" && panError && <div className="text-red-500 text-sm">{panError}</div>}
      {label === "Aadhar Card" && aadharError && <div className="text-red-500 text-sm">{aadharError}</div>}
      <div className="font-normal text-sm">* Upload a file below (max 5MB)</div>
      <input
        accept="image/*,application/pdf"
        type="file"
        ref={inputRef}
        onChange={(event) => handleFileChange(event, setFile, field, type)}
        style={{ display: 'none' }}
        required
      />
      <div className="flex flex-row justify-between w-full items-center">
        {!file ? (
          <button
            className="py-[14px] rounded-lg bg-[#3b78c3] text-white text-[17px] font-medium w-full"
            onClick={() => triggerFileInput(inputRef)}
            disabled={loading}
          >
            {loading ? 'Uploading...' : `Upload Original ${label}`}
          </button>
        ) : (
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row w-[50%] gap-[8px]">
              <img src="/document.svg" className="w-[40px] h-[40px]" />
              <div className="flex flex-col gap-[12px]">
                <div className="font-medium text-sm">{file.name}</div>
                <div className="relative w-full h-[8px] bg-blue-200 rounded-lg overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-blue-500 animate-progress-bar"></div>
                </div>
              </div>
              <button className="bg-white px-0 py-0" onClick={() => handleRemoveFile(setFile, type)}>
                <img src="/cross-circle 2.svg" className="h-[20px] w-[20px]" />
              </button>
            </div>
            <div className="flex gap-2">
              <RedButton label={"View"} onClick={() => handleViewImage(file)} />
            </div>
          </div>
        )}
      </div>
      {uploadAttempted[type] && uploadError && <div className="text-red-500 text-sm">{uploadError}</div>}
      {uploadAttempted[type] && uploadSuccess && <div className="text-green-500 text-sm">{uploadSuccess}</div>}
    </div>
  );

  return (
    <div className="flex flex-col w-full">
      {finalRes && <div className="text-red-500 text-sm">{apiRes}</div>}
      <div className="flex flex-col gap-[32px] w-full">
        <div className="text-2xl font-bold">Upload Documents</div>
        <div className="flex flex-col gap-[32px] w-full">
          {renderUploadSection(
            "Pan Card",
            "Enter Your Pan Number",
            userData['panNo'] || '',
            (e) => { setUserData({ ...userData, "panNo": e.target.value }); setPanNumber(e.target.value); },
            panCardFile,
            setPanCardFile,
            panCardInputRef,
            "Pan",
            "panCard" 
          )}
          {renderUploadSection(
            "Aadhar Card",
            "Enter Your Aadhar Number",
            userData['aadharNo'] || '',
            (e) => { setUserData({ ...userData, "aadharNo": e.target.value }); setAadharNumber(e.target.value); },
            aadharCardFile,
            setAadharCardFile,
            aadharCardInputRef,
            "Aadhar",
            "aadharCard" 
          )}
          <div className={`flex ${!userPhotoFile || !signatureFile ? 'flex-row' : 'flex-col'} gap-[16px]`}>
            <div className={`${!userPhotoFile ? 'w-[50%]' : 'w-full'}`}>
              {renderUploadSection(
                "Photograph",
                "",
                null,
                null,
                userPhotoFile,
                setUserPhotoFile,
                userPhotoInputRef,
                "Photo",
                "userPhoto" 
              )}
            </div>
            <div className={`${!signatureFile ? 'w-[50%]' : 'w-full'}`}>
              {renderUploadSection(
                "Signature",
                "",
                null,
                null,
                signatureFile,
                setSignatureFile,
                signatureInputRef,
                "Signature",
                "signature" 
              )}
            </div>
          </div>
        </div>
      </div>
      <RedButton
        label={"Continue"}
        onClick={submit}
        disabled={!isFormValid || loading}
        className={`${(!aadharCardFile && !panCardFile && !userPhotoFile && !signatureFile) ? 'mt-[24px]' : 'mt-5'}`}
        loading={apiRes}
      />
    </div>
  );
};

export default ThirdStep;
