import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    agreeTerms: false,
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.agreeTerms) {
        alert('Please agree to the Terms of Service and Privacy Policy.');
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
        ...formData,
        password: bcrypt.hashSync(formData.password, 10), // Hash password before sending
      });
      console.log('Registration successful', response.data);
      setShowPopup(true);
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Function to close the popup
  };

  const handleGoogleSignup = async (response) => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google-login`, {
        tokenId: response.credential,
      });
      console.log('Google login successful:', result.data);
      localStorage.setItem('authToken', result.data.token);
      navigate('/Successful');
    } catch (error) {
      console.error('Google login failed:', error);
      setErrorMessage('Google login failed');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
    setErrorMessage('Google login failed');
  };
  return (
    <GoogleOAuthProvider clientId={clientId}>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-xl font-bold -mt-2 mb-4">Create your new account</h1>
        <p className="text-gray-600 -mt-2 mb-6">
          Create an account to start looking for the food you like
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 -mt-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border h-10 border-gray-300 rounded-lg"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-4 -mt-2">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border h-10 border-gray-300 rounded-lg"
              placeholder="User Name"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Password"
            />
          </div>
          <div className="mb-4 -mt-2 flex items-center">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="agreeTerms" className="text-gray-700">
              I Agree with{' '}
              <a href="#" className="text-orange-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-orange-500">
                Privacy Policy
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600"
          >
            Register
          </button>
        </form>
        <div className="my-6 flex items-center">
          <div className="border-t border-gray-300 flex-grow"></div>
          <div className="px-3 text-gray-500">Or sign in with</div>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <div className="flex -mt-3 justify-center">
          <button  className="text-3xl">
          <GoogleLogin
              onSuccess={handleGoogleSignup}
              onError={handleGoogleFailure}
              useOneTap
            />
          </button>
        </div>
        <div className="mt-2 text-center">
          <p className="text-gray-600">
            Have an account?{' '}
            <a href="/Login" className="text-orange-500 font-bold">
              Sign In
            </a>
          </p>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Registration Successful!</h2>
            <p className="mb-4">You have successfully registered your account.</p>
            <button
              onClick={closePopup}
              className="w-full p-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </GoogleOAuthProvider>

  );
};

export default Signup;
