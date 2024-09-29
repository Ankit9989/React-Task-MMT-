import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';  
import { savePlanSelection } from '../../store/store'; 
import {
  Grid, MenuItem, Select, Stack, TextField, Typography, Button, FormControl, Dialog, DialogTitle, DialogContent, IconButton, Table, TableBody,TableHead, TableCell, TableRow, TableContainer
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import Card from "../../Components/Cards";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LabelOfInputs from '../../Components/LabelOfInputs';
import dayjs from 'dayjs';
import PageHeading from "../../Components/PageHeading";

const PlanSelectionForm = ({ onSubmit, initialValues = {} }) => {
  const dispatch = useDispatch();  

  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); 

  useEffect(() => {}, [initialValues]);

  const plans = {
    monthly: {
      gold: 100,
      titanium: 200,
    },
    yearly: {
      gold: 1000,
      titanium: 2000,
    },
  };

  const initialValue = {
    startDate: initialValues.startDate ? dayjs(initialValues.startDate) : null,
    planType: initialValues?.planType || "",
    planOption: initialValues?.planOption || "",
    users: initialValues?.users || "",
  };

  const formFields = [
    {
      id: 1,
      label: 'Start Plan Date',
      name: 'startDate',
      type: 'date',
      isRequired: true,
    },
    {
      id: 2,
      label: 'Plan Type',
      name: 'planType',
      type: 'select',
      isRequired: true,
      options: [
        { key: 'monthly', value: 'Monthly' },
        { key: 'yearly', value: 'Yearly' },
      ],
    },
    {
      id: 3,
      label: 'Plan Option',
      name: 'planOption',
      type: 'select',
      isRequired: true,
      options: [
        { key: 'gold', value: 'Gold' },
        { key: 'titanium', value: 'Titanium' },
      ],
    },
    {
      id: 4,
      label: 'Number of Users',
      name: 'users',
      type: 'number',
      isRequired: true,
    },
  ];

  const formValidation = Yup.object({
    startDate: Yup.date().required('Start date is required'),
    planType: Yup.string().required('Plan type is required'),
    planOption: Yup.string().required('Plan option is required'),
    users: Yup.number()
      .required('Number of users is required')
      .min(1, 'At least 1 user required'),
  });

  const calculateFinalPrice = () => {
    if (!values.planType || !values.planOption || !values.users || !values.startDate) {
      setTouched({
        planType: true,
        planOption: true,
        users: true,
        startDate: true,
      });
      return;
    }

    const planPrice = plans[values.planType][values.planOption];
    const total = planPrice * values.users;
    setFinalPrice(total);
    setSelectedPlan(`${values.planType} - ${values.planOption}`);
    dispatch(savePlanSelection(values));

    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const formatLabel = (label) => {
    return label.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setTouched, 
  } = useFormik({
    initialValues: initialValue,
    validationSchema: formValidation,
    onSubmit: (values) => {
      onSubmit(values); 
    },
  });

  const personalInfo = useSelector((state) => state.form.personalInfo);
  const companyInfo = useSelector((state) => state.form.companyInfo);

  return (
    <>
      <Stack p={3} component="form" onSubmit={handleSubmit}>
        <Card padding={3}>
        <PageHeading heading="Plan Selection" />
          <Grid container spacing={3}>
            {formFields.map((field) => (
              <Grid item xs={12} sm={6} md={4} key={field.id}>
                <Stack sx={{ width: '100%' }}>
                  <LabelOfInputs label={field.label} isRequired={field.isRequired} />
                  {field.type === 'date' && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        onChange={(date) => setFieldValue(field.name, date)}
                        format="DD-MM-YYYY"
                        value={values.startDate}
                        renderInput={(params) => (
                            <TextField
                              {...params}
                              name={field.name}
                              onBlur={handleBlur}
                              error={touched[field.name] && Boolean(errors[field.name])}
                              helperText={touched[field.name] && errors[field.name]}
                            />
                          )}
                      />
                    </LocalizationProvider>
                  )}

                  {field.type === 'select' && (
                    <FormControl fullWidth>
                      <Select
                        name={field.name}
                        value={values[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        displayEmpty
                        error={touched[field.name] && Boolean(errors[field.name])}
                        helperText={touched[field.name] && errors[field.name]}
                      >
                        {field.options.map((option) => (
                          <MenuItem key={option.key} value={option.key}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {field.type === 'number' && (
                    <TextField
                      fullWidth
                      type="number"
                      name={field.name}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                  {errors[field?.name] && touched[field?.name] && (
                            <Typography color="red" fontSize={12} marginTop={0}>
                              {errors[field?.name]}
                            </Typography>
                          )}
                </Stack>
              </Grid>
            ))}
            
            <Grid item xs={12} sm={12} md={12}>
              <Button variant="contained" color="primary" onClick={calculateFinalPrice}>
                Calculate Price
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Stack>
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>
          View Summary
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                  <TableCell colSpan={2}>
                    <Typography variant="h6">Personal Information</Typography>
                  </TableCell>
                </TableRow>
                {Object.entries(personalInfo).map(([key, value], index) => (
                  <TableRow key={key} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                    <TableCell>{formatLabel(key)}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                  <TableCell colSpan={2}>
                    <Typography variant="h6">Company Information</Typography>
                  </TableCell>
                </TableRow>
                {Object.entries(companyInfo).map(([key, value], index) => (
                  <TableRow key={key} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                    <TableCell>{formatLabel(key)}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                  <TableCell colSpan={2}>
                    <Typography variant="h6">Plan Selection</Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                  <TableCell>Plan Type</TableCell>
                  <TableCell>{values.planType}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#ffffff' }}>
                  <TableCell>Plan Option</TableCell>
                  <TableCell>{values.planOption}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                  <TableCell>Number of Users</TableCell>
                  <TableCell>{values.users}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#ffffff' }}>
                  <TableCell>Total Price</TableCell>
                  <TableCell>INR {finalPrice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlanSelectionForm;
