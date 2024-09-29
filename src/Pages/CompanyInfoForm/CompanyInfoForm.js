import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import {
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormGroup,
} from "@mui/material";
import Card from "../../Components/Cards";
import PageHeading from "../../Components/PageHeading";
import { MEDIA_QUERY_LIMIT } from "../../utils/commonFunction";

const CompanyInfoForm = ({ onSubmit, initialValues }) => {
  const isMobile = useMediaQuery(MEDIA_QUERY_LIMIT);

  const formValidation = Yup.object().shape({
    company_domain: Yup.array()
      .min(1, "Your company is working on which field? is Required")
      .required("Your company is working on which field? is Required"),
    employees_strength: Yup.string().required("Employees strength is required"),
    wfh_policy: Yup.string().required("WFH policy is required"),
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: formValidation,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const formFields = [
    {
      id: 1,
      label: "Your company is working on which field?",
      name: "company_domain",
      type: "checkbox",
      fieldType: "checkbox",
      isRequired: true,
      showField: true,
      isDisabled: false,
      options: [
        { key: "tech", value: "Technology" },
        { key: "marketing", value: "Marketing" },
        { key: "finance", value: "Finance" },
        { key: "design", value: "Design" },
      ],
    },
    {
      id: 2,
      label: "How many employees are in your company?",
      name: "employees_strength",
      type: "select",
      fieldType: "dropdown",
      isRequired: true,
      showField: true,
      isDisabled: false,
      options: [
        { key: "1-10", value: "1-10" },
        { key: "10-20", value: "10-20" },
        { key: "20-30", value: "20-30" },
        { key: "40+", value: "40+" },
      ],
    },
    {
      id: 3,
      label: "Does the company have a WFH policy?",
      name: "wfh_policy",
      type: "radio",
      fieldType: "radio",
      isRequired: true,
      showField: true,
      isDisabled: false,
      options: [
        { key: "yes", value: "Yes" },
        { key: "no", value: "No" },
      ],
    },
  ];

  const [formFieldsData, setFormFieldData] = useState(formFields);

  return (
    <Stack p={isMobile ? 2 : 3}>
      <form onSubmit={handleSubmit}>
        <Card padding={3}>
          <PageHeading heading="Company Information" />
          
          <Grid container spacing={isMobile ? 2 : 3} marginTop="7px">
            <Grid item xs={12} sm={6} md={4}>
              <FormControl component="fieldset">
                <Typography component="legend">
                  <span style={{ color: "red" }}>* </span>
                  Your company is working on which field?
                </Typography>
                <FormGroup>
                  {formFieldsData[0].options.map((option) => (
                    <FormControlLabel
                      key={option.key}
                      control={
                        <Checkbox
                          name="company_domain"
                          value={option.key}
                          checked={values.company_domain?.includes(option.key) || false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFieldValue("company_domain", [...(values.company_domain || []), option.key]);
                            } else {
                              setFieldValue(
                                "company_domain",
                                values.company_domain.filter((val) => val !== option.key)
                              );
                            }
                          }}
                        />
                      }
                      label={option.value}
                      sx={{ display: 'flex', alignItems: 'center' }} 
                    />
                  ))}
                </FormGroup>
                {touched.company_domain && errors.company_domain && (
                  <Typography color="error" variant="body2">
                    {errors.company_domain}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Stack sx={{ width: "100%" }}>
                <Typography>
                  <span style={{ color: "red" }}>* </span>
                  How many employees are in your company?
                </Typography>
                <Select
                  size="small"
                  name="employees_strength"
                  value={values.employees_strength}
                  onChange={handleChange}
                  displayEmpty
                  error={touched.employees_strength && Boolean(errors.employees_strength)}
                >
                  {formFieldsData[1].options.map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
                {touched.employees_strength && errors.employees_strength && (
                  <Typography color="error" variant="body2">
                    {errors.employees_strength}
                  </Typography>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl component="fieldset">
                <Typography component="legend">
                  <span style={{ color: "red" }}>* </span>
                  Does the company have a WFH policy?
                </Typography>
                <RadioGroup
                  name="wfh_policy"
                  value={values.wfh_policy}
                  onChange={handleChange}
                  row  
                >
                  {formFieldsData[2].options.map((option) => (
                    <FormControlLabel
                      key={option.key}
                      value={option.key}
                      control={<Radio />}
                      label={option.value}
                      sx={{ display: 'flex', alignItems: 'center' }}  
                    />
                  ))}
                </RadioGroup>
                {touched.wfh_policy && errors.wfh_policy && (
                  <Typography color="error" variant="body2">
                    {errors.wfh_policy}
                  </Typography>
                )}
              </FormControl>
            </Grid>

          </Grid>
          <Stack direction="row" justifyContent={isMobile ? "center" : "flex-end"}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: 2,
                width: isMobile ? "100%" : "auto",
                marginTop: 2,
              }}
            >
              Save
            </Button>
          </Stack>

        </Card>
      </form>
    </Stack>
  );
};

export default CompanyInfoForm;
