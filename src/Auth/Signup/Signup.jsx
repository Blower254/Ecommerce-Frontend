import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
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
import GoogleLogin from '../GoogleLogin';
import { Input } from 'antd';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { baseUrl } = useBaseUrl();

  const handleSignup = async (values) => {
    try {
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const newUser = userCredential.user;

      const updatedValues = {
        ...values,
        useruid: newUser.uid,
      };

      const response = await axios.post(`${baseUrl}/api/signup`, updatedValues);
      const newUserFromServer = response.data.newUser;
      localStorage.setItem('user', JSON.stringify(newUserFromServer));

      navigate('/auth/login');
      toast.success('Account Created Successfully');
    } catch (error) {
      toast.error("Error Signing Up! Ensure to use Unique Username or Login");
      console.error(error.code, error.message);
    } finally {
      setIsLoading(false);
      navigate('/');
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
          <div className='mb-2'>
            <label htmlFor='username'>Username:</label>
            <Input type='text' id='username' name='username' placeholder='Username' {...formik.getFieldProps('username')} />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email:</label>
            <Input type='email' id='email' name='email' placeholder='Email' {...formik.getFieldProps('email')} />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className='mb-2'>
            <label htmlFor='password'>Password:</label>
            <Input.Password id='password' name='password' placeholder='Password' {...formik.getFieldProps('password')} />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div className='mb-2'>
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <Input.Password id='confirmPassword' name='confirmPassword' placeholder='Confirm Password' {...formik.getFieldProps('confirmPassword')} />
            <ErrorMessage name="confirmPassword" component="div" className="error" />
          </div>

          <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
            {isLoading ? <Loading /> : 'Signup'}
          </button>
        </Form>
      </Formik>
      <div>
        <br />
        <p>OR</p>
        <GoogleLogin />
      </div>
    </div>
  );
}

export default Signup;
