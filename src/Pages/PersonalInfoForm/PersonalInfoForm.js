import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import BackButton from "../../Components/BackButton";
import Card from "../../Components/Cards";
import PageHeading from "../../Components/PageHeading";
import LabelOfInputs from "../../Components/LabelOfInputs";
import { validateValue, MEDIA_QUERY_LIMIT } from "../../utils/commonFunction";
import { useState } from "react";

const PersonalInfoForm = ({onSubmit,initialValues }) => {
  const isMobile = useMediaQuery(MEDIA_QUERY_LIMIT);

  const formValidation = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    company_name: Yup.string().required("Company Name is required"),
    company_website: Yup.string().required("Company Website is required"),
    zip_code: Yup.string()
      .min(6, "Zip Code must be at least 6 characters")
      .max(6, "Zip Code must be at most 6 characters")
      .required("Zip Code is required"),
    state: Yup.string().required("State is required"),
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
      label: "First Name",
      name: "first_name",
      type: "text",
      fieldType: "input",
      placeholder: "",
      regexType: "alphabets",
      isRequired: true,
      showField: true,
      isDisabled: false,
    },
    {
      id: 2,
      label: "Last Name",
      name: "last_name",
      type: "text",
      fieldType: "input",
      placeholder: "",
      regexType: "alphabets",
      isRequired: true,
      showField: true,
      isDisabled: false,
      options: [],
    },
    {
      id: 3,
      label: "Email",
      name: "email",
      type: "text",
      fieldType: "input",
      placeholder: "",
      regexType: "",
      isRequired: true,
      showField: true,
      isDisabled: false,
      options: [],
    },
    {
      id: 4,
      label: "Company Name",
      name: "company_name",
      type: "text",
      fieldType: "input",
      placeholder: "",
      regexType: "alphabets",
      isRequired: true,
      showField: true,
      isDisabled: false,
      options: [],
    },
    {
      id: 5,
      label: "Company Website",
      name: "company_website",
      type: "text",
      fieldType: "input",
      placeholder: "",
      regexType: "alphabets",
      isRequired: true,
      showField: true,
      isDisabled: false,
      options: [],
    },
    {
        id: 6,
        label: "Zip code",
        name: "zip_code",
        type: "text",
        fieldType: "input",
        placeholder: "",
        regexType: "number",
        isRequired: true,
        showField: true,
        isDisabled: false,
        options: [],
      },
      {
        id: 7,
        label: "State",
        name: "state",
        type: "select",       
        fieldType: "dropdown", 
        placeholder: "Select your state",  
        regexType: "",
        isRequired: true,
        showField: true,
        isDisabled: false,
        options: [
          { key: "gujarat", value: "Gujarat" },
          { key: "rajasthan", value: "Rajasthan" },
          { key: "Haryana", value: "Haryana" },
          { key: "up", value: "Uttar Pardesh" },
        ],
      }
      
  ];
  const [formFieldsData, setFormFieldData] = useState(formFields);
  return (
    <>
      <Stack p={isMobile ? 2 : 3}>
        <form onSubmit={handleSubmit}>
          <Card padding={3}>
            <PageHeading heading="Personal Information" />
            <Grid
              container
              columnSpacing={isMobile ? 1 : 3}
              rowSpacing={isMobile ? 1 : 3}
              marginTop="7px"
            >
              {formFieldsData &&
                formFieldsData?.map(
                  (field) =>
                    field?.showField && (
                      <Grid item xs={isMobile ? 12 : 4} key={field?.id}>
                        <Stack width="100%">
                          <LabelOfInputs
                            label={field?.label}
                            isRequired={field?.isRequired}
                          />
                          {field?.fieldType === "dropdown" && (
                            <Select
                              size="small"
                              placeholder={field.placeholder}
                              name={field?.name}
                              value={values[field?.name]}
                              onChange={(e) => handleChange(e)}
                              onBlur={handleBlur}
                              disabled={field?.isDisabled}
                            >
                              {field?.options?.map((option) => (
                                <MenuItem key={option.key} value={option.key}>
                                  {option.value}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                          {field?.fieldType === "input" && (
                            <TextField
                              type={field?.type}
                              placeholder={field?.placeholder}
                              size="small"
                              id={`text-feild-${field.id}`}
                              name={field?.name}
                              value={values[field?.name]}
                              onChange={(e) =>
                                setFieldValue(
                                  field.name,
                                  validateValue(
                                    e?.target?.value,
                                    field?.regexType
                                  )
                                )
                              }
                              onBlur={handleBlur}
                              disabled={field?.isDisabled}
                              {...(field.name === "person_phone_number"
                                ? { inputProps: { maxLength: 10 } }
                                : {})}
                            />
                          )}
                          {errors[field?.name] && touched[field?.name] && (
                            <Typography color="red" fontSize={12} marginTop={0}>
                              {errors[field?.name]}
                            </Typography>
                          )}
                        </Stack>
                      </Grid>
                    )
                )}
            </Grid>
            <Stack
              direction={"row"}
              justifyContent={isMobile ? "center" : "end"}
            >
              <Button
                type="submit"
                slot="end"
                variant="contained"
                style={{
                  borderRadius: "6px",
                  width: isMobile ? "100%" : "auto",
                  textAlign: "center",
                  marginTop: "18px",
                }}
              >
                Save
              </Button>
            </Stack>
          </Card>
        </form>
      </Stack>
    </>
  );
};

export default PersonalInfoForm;
