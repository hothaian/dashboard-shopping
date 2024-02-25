import { Box, Button, TextField  } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Formik, useField } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";

const AddUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");


  async function checkEmailExistence(email) {
    try {
      // Replace with your actual API endpoint URL
      const url = 'http://localhost:1234/users/all';
  
      // Secure communication (HTTPS is strongly recommended)
      const response = await axios.get(url);
  
      if (!response.data.length) { // Handle empty response
        console.error('No users found in the API response.');
        return false; // Or throw an error
      }
  
      const foundEmail = response.data.find((user) => user.email === email);
      return foundEmail ? true : false;
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false; // Default to false in case of errors (adjust as needed)
    }
  }

  const handleFormSubmit = async (values) => {
    const formattedValues = {
      id: 1, // Assuming this is always static value
      name: values.firstName + " " + values.lastName,
      email: values.email,
      age: values.age,
      phone: values.contact, // Assuming "contact" maps to phone number
      access: values.access,
    };
  
    try {
      // Check if email already exists
      const emailExists = await checkEmailExistence(formattedValues.email);
  
      if (emailExists) {
        console.error('Email already exists');
        // Handle email already exists scenario (e.g., display error message)
        return; // Prevent further processing if email already exists
      }
  
      // Submit the formatted data
      submitFormData(formattedValues);
    } catch (error) {
      console.error('Error checking email existence:', error);
      
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 4" }}
              />
              
              <Select
                defaultValue='user'
                fullWidth
                variant="filled"
                onBlur={handleBlur}
                id="demo-simple-select"
                error={!!touched.access && !!errors.access}
                helperText={touched.access && errors.access}
                sx={{ gridColumn: "span 4" }}
                value={values.access}
                name="access"
                label="Access"
                onChange={handleChange}
              >
                <MenuItem value='admind'>Admin</MenuItem>
                <MenuItem value='user'>User</MenuItem>
                <MenuItem value='manager'>Manager</MenuItem>
              </Select>              
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  age: yup.number().required("Age is required").positive("Age must be positive"),
  access: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  age: "",
  access: "",
};

export default AddUser;