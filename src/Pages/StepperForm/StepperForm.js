import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePersonalInfo, saveCompanyInfo, savePlanSelection } from '../../store/store';
import PersonalInfoForm from '../PersonalInfoForm/PersonalInfoForm';
import CompanyInfoForm from '../CompanyInfoForm/CompanyInfoForm';
import PlanSelectionForm from '../PlanSelectionForm/PlanSelectionForm';
import { Stepper, Step, StepLabel, StepConnector, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import BackButton from '../../Components/BackButton';

const BlueConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${StepConnector.line}`]: {
    borderColor: '#1e90ff',  
  },
}));

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);

  const steps = ['Personal Information', 'Company Information', 'Plan Selection'];

  const handleNext = (values) => {
    if (activeStep === 0) dispatch(savePersonalInfo(values));
    if (activeStep === 1) dispatch(saveCompanyInfo(values));
    if (activeStep === 2) dispatch(savePlanSelection(values));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfoForm onSubmit={handleNext} initialValues={formState.personalInfo} />;
      case 1:
        return <CompanyInfoForm onSubmit={handleNext} initialValues={formState.companyInfo} />;
      case 2:
        return <PlanSelectionForm onSubmit={handleNext} initialValues={formState.planSelection}  />;
      default:
        return 'Unknown step';
    }
  };


  const StepIcon = (props) => {
    const { active, completed } = props;

    return (
      <>
        {completed ? (
          <CheckCircleIcon style={{ color: 'green' }} /> 
        ) : active ? (
          <ErrorIcon style={{ color: 'red' }} /> 
        ) : (
          <div style={{ color: 'grey' }}>●</div>  
        )}
      </>
    );
  };

  return (
    <div>
      <Stepper
        activeStep={activeStep}
        connector={<BlueConnector />}  
        style={{ marginTop: '20px' }}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel> 
          </Step>
        ))}
      </Stepper>

      <Stack flex={1} height="-webkit-fill-available" p="1em">
        {activeStep > 0 && <BackButton buttonText="Back" backBtnClickHandler={handleBack} />}
      </Stack>

      <div>
        {getStepContent(activeStep)}
      </div>
    </div>
  );
};

export default StepperForm;
