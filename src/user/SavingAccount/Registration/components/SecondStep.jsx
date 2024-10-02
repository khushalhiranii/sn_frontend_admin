import React, { useContext, useState, useEffect } from 'react';
import {
  FormControl,
  Typography,
  FormControlLabel,
  FormGroup,
  Switch
} from '@mui/material';
// import { Switch } from 'antd'; // Import Switch from Ant Design
import { multiStepContext } from '../context/StepContext';
import { styled } from '@mui/material/styles'; // Import styled from MUI
import RedButton from '../../../DesignSystem/RedButton';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const SwitchWithLabel = ({ checked, onChange, value, label }) => (
  <div className='flex items-center justify-start'>
    <span className='font-normal text-base pr-[8px] mr-[4px]'>{label}</span>
    <AntSwitch checked={checked} onChange={(event) => onChange(event.target.checked, value)} />
  </div>
);

const SecondStep = () => {
  const [employmentType, setEmploymentType] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const { setStep, userData, setUserData } = useContext(multiStepContext);

  useEffect(() => {
    if (employmentType && annualIncome) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [employmentType, annualIncome]);

  const handleEmploymentTypeChange = (checked, value) => {
    const newValue = checked ? value : '';
    setEmploymentType(newValue);
    setUserData({ ...userData, emp_type: newValue });
  };

  const handleAnnualIncomeChange = (checked, value) => {
    const newValue = checked ? value : '';
    setAnnualIncome(newValue);
    setUserData({ ...userData, income: newValue });
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col gap-[24px] w-full mt-[74px] mb-[106px] text-2xl font-bold'>
        Employment Details
      <FormControl component='fieldset'>
        <div className='text-[20px] mb-[16px] font-normal'>Employment Type</div>
        <FormGroup>
          <table>
            <tr>
              <td>
            <SwitchWithLabel
              checked={employmentType === 'Salaried'}
              onChange={handleEmploymentTypeChange}
              value='Salaried'
              label='Salaried'
            />
            </td>
            <td>
            <SwitchWithLabel
              checked={employmentType === 'Self Employed'}
              onChange={handleEmploymentTypeChange}
              value='Self Employed'
              label='Self-employed'
            />
            </td>
            </tr>
          </table>
        </FormGroup>
      </FormControl>

      <FormControl component='fieldset'>
      <div className='text-[20px] mb-[16px] font-normal'>Annual Income</div>
        <FormGroup>
          <table>
            <tr className="mb-4">
            <td>
          <SwitchWithLabel
            checked={annualIncome === 'Below 2 Lakhs'}
            onChange={handleAnnualIncomeChange}
            value='Below 2 Lakhs'
            label='Below 2 Lakhs'
          />
          </td>
          <td>
          <SwitchWithLabel
            checked={annualIncome === '2-5 Lakhs'}
            onChange={handleAnnualIncomeChange}
            value='2-5 Lakhs'
            label='2-5 Lakhs'
          />
          </td>
          </tr>
          <tr>
            <td>
          <SwitchWithLabel
            checked={annualIncome === '5-10 Lakhs'}
            onChange={handleAnnualIncomeChange}
            value='5-10 Lakhs'
            label='5-10 Lakhs'
          />
          </td>
          <td>
          <SwitchWithLabel
            checked={annualIncome === 'Above 10 Lakhs'}
            onChange={handleAnnualIncomeChange}
            value='Above 10 Lakhs'
            label='Above 10 Lakhs'
          />
          </td>
          </tr>
          </table>
        </FormGroup>
      </FormControl>
      </div>
      <RedButton label={"Continue"} onClick={() => setStep(3)}
          disabled={!isFormValid} className={`${!isFormValid && 'opacity-50 cursor-not-allowed'}`} />
    </div>
  );
};

export default SecondStep;
