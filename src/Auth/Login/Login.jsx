import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import './Login.css';  // Make sure to import your Login.css file
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

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
  // Function to handle login logic
  const handleLogin = async (values) => {

    signInWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/products")
        console.log(user);
        toast.success("Logged in Successfully");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
    console.log(values);
    // Add your login logic here
  };

  // Formik hook for form state management
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: handleLogin,
  });

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

          {/* Submit button */}
          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
