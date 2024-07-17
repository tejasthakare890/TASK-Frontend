import React from 'react';
import axios from 'axios';

const LoginSuccessful = () => {
  const handleGoToTracking = () => {
    // Handle navigation to the tracking screen
    // Replace with your navigation logic
    window.location.href = '/Track'; // Example direct navigation
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`);
  
      if (response.status === 200) {
        // Clear local storage or any client-side tokens/cookies if necessary
        localStorage.removeItem('token'); // Example: remove JWT from localStorage
        // Redirect to login page or any other page after logout
        window.location.href = '/'; // Example: redirect to homepage
      } else {
        console.error('Logout failed:', response.data.msg);
        // Handle logout failure, if needed
      }
    } catch (error) {
      console.error('Logout error:', error.message);
      // Handle potential network or other errors
    }
  };
  
  return (
    <div className="main flex justify-center">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <img src='i1.png' className="relative h-screen w-screen" alt="Background" />
        <div className="bg-white absolute w-[60%] items-center justify-center inset-x-30 bottom-10 rounded-2xl flex flex-col p-8">
          <div className="flex justify-center mb-4">
            <img src="Success.png" alt="Success" className="w-[80%]" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Login Successful</h1>
          <button
            onClick={handleGoToTracking}
            className="w-full p-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 mb-4"
          >
            Go to Tracking Screen
          </button>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessful;
