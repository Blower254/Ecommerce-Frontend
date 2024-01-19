import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useFormik } from 'formik';
import './Signup.css';

const usernameRegex = /^[a-zA-Z0-9_.-]{6,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .matches(usernameRegex, 'Invalid username format')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username cannot exceed 20 characters')
      .required('Username is required'),
    email: Yup.string()
      .matches(emailRegex, 'Invalid email format')
      .required('Email is required'),
    
  });

function Signup() {


  const navigate = useNavigate();
  
  // Declare handleSignup before it's used
  const handleSignup = async (values) => {
  

    try {

      if (values.password !== values.confirmPassword) {
        toast.error('Passwords do not match.');
       
      } else{
        // Call your endpoint to register the user
        const response = await axios.post('YOUR_ENDPOINT/SIGNUP', {
          username: values.username,
          email: values.email,
          password: values.password,
        });

        // Check the response and handle accordingly
        if (response.data.success) {
          // Redirect to success page on successful signup
          navigate('/success');
        } else {
          // Handle errors or display appropriate messages
          toast.error('Signup failed. Please try again.');
        }
      }
    } catch (error) {

      console.error('Error during signup:', error);
      toast.error('An error occurred during signup. Please try again.');
    }
  
    
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: handleSignup,
  });

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    formik.setFieldValue('password', password);
    
    
    
  };
  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;

      formik.setFieldValue('confirmPassword', confirmPassword);
  };
  

  return (
    <div className="signup-container">
    <h2 className="signup-heading">Signup</h2>
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSignup}
    >
      <Form>
        <div className="form-floating mb-3">
          <Field type="text" id="username" name="username" className="form-control" placeholder="Username" />
          <label htmlFor="username">Username</label>
          <ErrorMessage name="username" component="div" className="error" />
        </div>

        <div className="form-floating mb-3">
          <Field type="email" id="email" name="email" className="form-control" placeholder="name@example.com" />
          <label htmlFor="email">Email address</label>
          <ErrorMessage name="email" component="div" className="error" />
        </div>

        <div className="form-floating mb-3">
          <Field
            type="password"
            id="password"
            name="password"
            onChange={(e) => handlePasswordChange(e)}
            value={formik.values.password}
            className="form-control"
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
          <ErrorMessage name="password" component="div" className="error" />
        </div>

        <div className="form-floating">
          <Field type="password" id="confirmPassword" name="confirmPassword" onChange={(e) => handleConfirmPasswordChange(e)} value={formik.values.confirmPassword} className="form-control" placeholder="Confirm Password" />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <ErrorMessage name="confirmPassword" component="div" className="error" />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Signup</button>
      </Form>
    </Formik>
  </div>
);
}

export default Signup;
