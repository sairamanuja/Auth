import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handler for token input
  const handleTokenChange = (e) => {
    setToken(e.target.value);
    setError(''); 
    setSuccess(''); 
  };

  
  const handleVerify = async () => {
    if (!token) {
      setError('Please enter a valid token.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/verify', { token });
      if (response.status === 201) {
        setSuccess(response.data.message);
        alert('Email verified successfully!');
        navigate('/login'); 
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while verifying the token.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-7 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className="text-gray-600 mb-4">
          Please enter the verification token sent to your email
        </p>
        <input
          type="text"
          value={token}
          onChange={handleTokenChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          placeholder="Verification Token"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
        <button
          onClick={handleVerify}
          className={`p-2 rounded-md bg-blue-500 text-white`}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Verification;
