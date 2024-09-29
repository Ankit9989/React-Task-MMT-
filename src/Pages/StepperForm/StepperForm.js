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
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);  
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);

  const steps = ['Personal Information', 'Company Information', 'Plan Selection'];

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return formState.personalInfo && Object.keys(formState.personalInfo).length > 0;
      case 1:
        return formState.companyInfo && Object.keys(formState.companyInfo).length > 0;
      case 2:
        return formState.planSelection && Object.keys(formState.planSelection).length > 0;
      default:
        return false;
    }
  };

  const handleNext = (values) => {
    let isFormValid = false;
    if (activeStep === 0) {
      dispatch(savePersonalInfo(values));
      isFormValid = isStepValid(0);
    } else if (activeStep === 1) {
      dispatch(saveCompanyInfo(values));
      isFormValid = isStepValid(1);
    } else if (activeStep === 2) {
      dispatch(savePlanSelection(values));
      isFormValid = isStepValid(2);
    }

    if (isFormValid) {
      const updatedCompletedSteps = [...completedSteps];
      updatedCompletedSteps[activeStep] = true;  
      setCompletedSteps(updatedCompletedSteps);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      alert('Please fill out the form correctly before proceeding.');
    }
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
    const { active, completed, index } = props;

    const isStepCompleted = completedSteps[index];  

    return (
      <>
        {isStepCompleted ? (
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
            <StepLabel StepIconComponent={(props) => <StepIcon {...props} index={index} />}>
              {label}
            </StepLabel>
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
