// Import necessary libraries and components
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';  // Make sure to import your Login.css file
import Loading from '../../Client/Loading/Loading';

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle login logic
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true); // Set loading to true when starting the login process

      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      console.log(user);
      const response = await axios.post('http://localhost:5000/api/login', user);
      const newUser = response.data.user;

      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success("Logged in Successfully");
      navigate("/products");
    } catch (error) {
      const errorMessage = error.message;
      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
      setIsLoading(false); // Set loading to false when login process is complete
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        <Form>
          {/* Email input */}
          <div className="form-floating mb-3">
            <Field type="email" id="email" name="email" className="form-control" placeholder="name@example.com" />
            <label htmlFor="email">Email address</label>
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          {/* Password input */}
          <div className="form-floating mb-3">
            <Field type="password" id="password" name="password" className="form-control" placeholder="Password" />
            <label htmlFor="password">Password</label>
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          {/* Submit button with loading indicator */}
          <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
            {isLoading ? <Loading /> : 'Login'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
