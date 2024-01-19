import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import './Signup.css';

const usernameRegex = /^[a-zA-Z0-9_.-]{6,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

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

function Signup() {
  // Declare handleSignup before it's used
  const handleSignup = async (values) => {
    
    console.log(values);
    
  };

  const isPasswordValid = (password) => {
    return passwordRegex.test(password);
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

          <button type="submit" className="btn btn-primary mt-3">
            Signup
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Signup;
