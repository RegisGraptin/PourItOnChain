'use client';
import React from 'react';
import axios from 'axios';

const CircleAPI = () => {

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const idempotencyKey = generateUUID();
  console.log("Generated idempotencyKey:", idempotencyKey);

  const apiCall1 = () => {
    const options = {
      method: 'POST',
      url: 'https://api.circle.com/v1/w3s/users',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer TEST_API_KEY:a015a5a0d162f6f31701af5bc8a82a1d:50f77d18549e29bc6eb1d0eecf326dbe' },
      data: { userId: 'pffc1011' }
    };

    axios
      .request(options)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

const handleCombinedCalls = async () => {
  try {
    // Step 1: Call apiCall2 to get the userToken and encryptionKey
    const response2 = await axios.post(
      'https://api.circle.com/v1/w3s/users/token',
      { userId: 'pffc1011' },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer TEST_API_KEY:a015a5a0d162f6f31701af5bc8a82a1d:50f77d18549e29bc6eb1d0eecf326dbe',
        },
      }
    );

    // Log the full response to debug
    console.log("Full Response from apiCall2:", response2);

    // Extract userToken and encryptionKey
    const userToken = response2.data?.data.userToken; // Optional chaining to safely access data
    const encryptionKey = response2.data?.data.encryptionKey;

    console.log("Extracted userToken:", userToken);
    console.log("Extracted encryptionKey:", encryptionKey);

    if (!userToken) {
      console.error("userToken is undefined. Cannot proceed to apiCall3.");
      return;
    }

    // Step 2: Use the userToken and idempotencyKey in apiCall3
    const response3 = await axios.post(
      'https://api.circle.com/v1/w3s/user/initialize',
      {
        idempotencyKey: idempotencyKey,
        blockchains: ['ETH-SEPOLIA'],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer TEST_API_KEY:a015a5a0d162f6f31701af5bc8a82a1d:50f77d18549e29bc6eb1d0eecf326dbe',
          'X-User-Token': userToken,
        },
      }
    );

    console.log("Response from apiCall3:", response3.data);

  } catch (error) {
    console.error("Error in combined calls:", error);
  }
};

  return (
    <div className='gap-5'>
      <button onClick={apiCall1}>getUser</button>
      <button onClick={handleCombinedCalls}>getTokenAndInitialize</button>
    </div>
  );
};

export default CircleAPI;
