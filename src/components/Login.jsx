import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log('Login successful', response.data);
      localStorage.setItem('authToken', response.data.token);
      navigate('/Successful');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Invalid email or password');
    }
  };

  const handleGoogleSuccess = async (response) => {
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
          <h1 className="text-2xl font-bold mb-4">Login to your account</h1>
          <p className="text-gray-600 mb-6">Please sign in to your account</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <div className="mb-6 flex justify-end">
              <a href="#" className="text-orange-500">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600"
            >
              Sign In
            </button>
          </form>
          <div className="my-6 flex items-center">
            <div className="border-t border-gray-300 flex-grow"></div>
            <div className="px-3 text-gray-500">Or sign in with</div>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
            />
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/Signup" className="text-orange-500 font-bold">Register</a>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
