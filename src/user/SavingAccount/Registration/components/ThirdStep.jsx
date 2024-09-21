import React, { useContext, useState, useEffect, useRef } from 'react';
import { multiStepContext } from '../context/StepContext';
import InputReg from '../../../DesignSystem/InputReg';
import RedButton from '../../../DesignSystem/RedButton';
import axiosInstance from '../../../../../axios.utils';

const ThirdStep = () => {
  const [panNumber, setPanNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [aadharCardFile, setAadharCardFile] = useState(null);
  const [panCardFile, setPanCardFile] = useState(null);
  const [userPhotoFile, setUserPhotoFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const { submitData, userData, setUserData } = useContext(multiStepContext);

  const panCardInputRef = useRef(null);
  const aadharCardInputRef = useRef(null);
  const userPhotoInputRef = useRef(null);
  const signatureInputRef = useRef(null);

  useEffect(() => {
    if (panNumber && aadharNumber && aadharCardFile && panCardFile && userPhotoFile && signatureFile) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [panNumber, aadharNumber, aadharCardFile, panCardFile, userPhotoFile, signatureFile]);

  const handleFileChange = async (event, setFile, field) => {
    const file = event.target.files[0];
    setFile(file);
    const formData = new FormData();
    formData.append('User-Docs', file);
    const Identifier = sessionStorage.getItem('Identifier')
    try {
      const response = await axiosInstance.post(`client/classic/Docs?Identifier=${Identifier}&Field=${field}`, formData)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  };

  const handleRemoveFile = (setFile) => {
    setFile(null);
  };

  const handleViewImage = (file) => {
    window.open(URL.createObjectURL(file), '_blank');
  };

  const triggerFileInput = (inputRef) => {
    inputRef.current.click();
  };

  const renderUploadSection = (label, placeholder, value, onChange, file, setFile, inputRef, field) => (
    <div className="flex flex-col gap-[16px]">
      <InputReg
        label={label}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="font-normal text-sm">* Upload a file below **mb</div>
      <input
        accept="image/*"
        type="file"
        ref={inputRef}
        onChange={(event) => handleFileChange(event, setFile, field)}
        style={{ display: 'none' }}
        required
      />
      <div className="flex flex-row justify-between w-full items-center">
        {!file ? (
          <button
            className="py-[14px] rounded-lg bg-[#B0D0F7] text-white text-[17px] font-medium w-full"
            onClick={() => triggerFileInput(inputRef)}
          >
            {`Upload Original ${label}`}
          </button>
        ) : (
          <div className="w-full flex flex-row justify-between">
            <div className='flex flex-row w-[50%] gap-[8px]'>
              <img src='/document.svg' className='w-[40px] h-[40px]'/>
              <div className='flex flex-col gap-[12px]'>
                <div className="font-medium text-sm">
                  {file.name}
                </div>
                <div className="relative w-full h-[8px] bg-blue-200 rounded-lg overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-blue-500 animate-progress-bar"></div>
                </div>
              </div>
              <button className='bg-white px-0 py-0'  onClick={() => handleRemoveFile(setFile)}>
                <img src='/cross-circle 2.svg' className='h-[20px] w-[20px] ' />
              </button>  
            </div>
            <div className="flex gap-2">
              <RedButton label={"View"} onClick={() => handleViewImage(file)} />  
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderUploadSection2 = (label, placeholder, value, onChange, file, setFile, inputRef, field) => (
    <div className="flex flex-col gap-[16px]">
      <div className="font-normal text-sm">* Upload a file below **mb</div>
      <input
        accept="image/*"
        type="file"
        ref={inputRef}
        onChange={(event) => handleFileChange(event, setFile, field)}
        style={{ display: 'none' }}
        required
      />
      <div className="flex flex-row justify-between w-full items-center">
        {!file ? (
          <button
            className="py-[14px] rounded-lg bg-[#B0D0F7] text-white text-[17px] font-medium w-full"
            onClick={() => triggerFileInput(inputRef)}
          >
            {`Upload Original ${label}`}
          </button>
        ) : (
          <div className='w-full text-sm font-semibold gap-[12px]'> <div className='mb-[14px]'>{label}</div>
          <div className="w-full flex flex-row justify-between">
            <div className='flex flex-row w-[50%] gap-[8px]'>
              <img src='/document.svg' className='w-[40px] h-[40px]'/>
              <div className='flex flex-col gap-[12px]'>
                <div className="font-medium text-sm">
                  {file.name}
                </div>
                <div className="relative w-full h-[8px] bg-blue-200 rounded-lg overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-blue-500 animate-progress-bar"></div>
                </div>
              </div>
              <button className='bg-white px-0 py-0'  onClick={() => handleRemoveFile(setFile)}>
                <img src='/cross-circle 2.svg' className='h-[20px] w-[20px] ' />
              </button>  
            </div>
            <div className="flex gap-2">
              <RedButton label={"View"} onClick={() => handleViewImage(file)} />  
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex flex-col gap-[32px] w-full">
        <div className="text-2xl font-bold">Upload Documents</div>
        <div className="flex flex-col gap-[32px] w-full">
          {renderUploadSection(
            "Pan Card",
            "Enter Your Pan Number",
            userData['panNo'] || '',
            (e)=>{setUserData({...userData, "panNo": e.target.value}); setPanNumber(e.target.value)},
            panCardFile,
            setPanCardFile,
            panCardInputRef,
            "Pan"
          )}
          {renderUploadSection(
            "Aadhar Card",
            "Enter Your Aadhar Number",
            userData['aadharNo'] || '',
            (e)=>{setUserData({...userData, "aadharNo": e.target.value}); setAadharNumber(e.target.value)},
            aadharCardFile,
            setAadharCardFile,
            aadharCardInputRef,
            "Aadhar"
          )}
          <div className={`flex ${!userPhotoFile || !signatureFile ? 'flex-row' : 'flex-col'} gap-[16px]`}>
  <div className={`${!userPhotoFile ? 'w-[50%]' : 'w-full'}`}>
    {renderUploadSection2(
      "Photograph",
      "",
      null,
      null,
      userPhotoFile,
      setUserPhotoFile,
      userPhotoInputRef,
      "Photo"
    )}
  </div>
  <div className={`${!signatureFile ? 'w-[50%]' : 'w-full'}`}>
    {renderUploadSection2(
      "Signature",
      "",
      null,
      null,
      signatureFile,
      setSignatureFile,
      signatureInputRef,
      "Signature"
    )}
  </div>
</div>

        </div>
      </div>
      <RedButton
  label={"Continue"}
  onClick={submitData}
  disabled={!isFormValid}
  className={`${(!aadharCardFile && !panCardFile && !userPhotoFile && !signatureFile) ? 'mt-[24px]' : 'mt-[4px]'} ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}
/>

    </div>
  );
};

export default ThirdStep;





{/* <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Upload Documents
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="PAN Number"
            variant="outlined"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            required
          />
          <input
            accept="image/*"
            id="pan-card-upload"
            type="file"
            onChange={handlePanCardChange}
            style={{ display: 'none' }}
            required
          />
          <div className='flex flex-row justify-between py-2 pb-6'>
            <label htmlFor="pan-card-upload">
              <Button variant="contained" component="span" size='large'>
                Upload PAN Card
              </Button>
            </label>
            {panCardFile && (
              <div style={{ marginTop: '1px' }}>
                <Button variant="outlined" onClick={() => handleViewImage(panCardFile)}>View PAN Card</Button>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Aadhar Number"
            variant="outlined"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            required
          />
          <input
            accept="image/*"
            id="aadhar-card-upload"
            type="file"
            onChange={handleAadharCardChange}
            style={{ display: 'none' }}
            required
          />
          <div className='flex flex-row justify-between py-2 pb-6'>
            <label htmlFor="aadhar-card-upload">
              <Button variant="contained" component="span">
                Upload Aadhar Card
              </Button>
            </label>
            {aadharCardFile && (
              <div style={{ marginTop: '10px' }}>
                <Button variant="outlined" onClick={() => handleViewImage(aadharCardFile)}>View Aadhar Card</Button>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <input
            accept="image/*"
            id="user-photo-upload"
            type="file"
            onChange={handleUserPhotoChange}
            style={{ display: 'none' }}
            required
          />
          <label htmlFor="user-photo-upload">
            <Button variant="contained" component="span">
              Upload Photograph
            </Button>
          </label>
          {userPhotoFile && (
            <div style={{ marginTop: '10px' }}>
              <Button variant="outlined" onClick={() => handleViewImage(userPhotoFile)}>View Photograph</Button>
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <input
            accept="image/*"
            id="signature-upload"
            type="file"
            onChange={handleSignatureChange}
            style={{ display: 'none' }}
            required
          />
          <label htmlFor="signature-upload">
            <Button variant="contained" component="span">
              Upload Signature
            </Button>
          </label>
          {signatureFile && (
            <div style={{ marginTop: '10px' }}>
              <Button variant="outlined" onClick={() => handleViewImage(signatureFile)}>View Signature</Button>
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <div className='flex flex-row gap-5 pt-5 pl-4'>
            <button onClick={() => { setStep(2) }} className="self-center py-2 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 focus:outline-none">
              Back
            </button>
            <button onClick={submitData} disabled={!isFormValid} className={`self-center py-2 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 focus:outline-none ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}>
              Submit
            </button>
          </div>
        </Grid>
      </Grid>
    </Paper> */}