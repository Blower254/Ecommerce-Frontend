// Import necessary libraries and components
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import Loading from '../../Client/Loading/Loading';
import { useBaseUrl } from '../../BaseUrlContext';

// Regular expressions for validation
const usernameRegex = /^[a-zA-Z0-9_.-]{6,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

// Schema for form validation using Yup
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .matches(usernameRegex, 'Invalid username format')
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .required('Username is required'),
  email: Yup.string()
    .matches(emailRegex, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .matches(passwordRegex, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

// Signup component
function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { baseUrl } = useBaseUrl();
  // Handle signup form submission
  const handleSignup = async (values) => {
    try {
      setIsLoading(true); // Set loading to true when starting the signup process
  
      // Include the userId in the values object
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const newUser = userCredential.user;
      console.log(newUser);
  
      // Update the user context with the new user information
      const updatedValues = {
        ...values,
        useruid: newUser.uid,
      };
  
      // Send the updatedValues to the server
      console.log(updatedValues);
      const response = await axios.post(`${baseUrl}/api/signup`, updatedValues);
      const newUserFromServer = response.data.newUser;
      localStorage.setItem('user', JSON.stringify(newUserFromServer));
  
      console.log('new User from server:', newUserFromServer);
  
      // Update the context with the new data
  
      // The user state should be updated at this point, so it should log correctly in useEffect
      navigate('/auth/login');
      toast.success('Account Created Successfully');
    } catch (error) {
      toast.error("Error Signing Up! Ensure to use Unique Username or Login");
  
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    } finally {
      setIsLoading(false); // Set loading to false when signup process is complete
      navigate('/');
    }
  };
  

  // Formik form setup
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

  // JSX for the Signup component
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
            <Field type="password" id="password" name="password" className="form-control" placeholder="Password" />
            <label htmlFor="password">Password</label>
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div className="form-floating">
            <Field type="password" id="confirmPassword" name="confirmPassword" className="form-control" placeholder="Confirm Password" />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <ErrorMessage name="confirmPassword" component="div" className="error" />
          </div>

          <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
            {isLoading ? <Loading /> : 'Signup'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

// Export the Signup component
export default Signup;
