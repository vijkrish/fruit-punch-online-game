// src/components/BuzzerButton.js
'use client';

import React from 'react';

const BuzzerButton = ({ playerId }) => {
  const handleBuzzerClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/hit-bell/${playerId}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Bell hit:', data);
        // Add any additional logic you want to perform on successful bell hit
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error hitting bell:', error);
    }
  };

  return (
    <button onClick={handleBuzzerClick} style={{
      padding: '20px',
      fontSize: '24px',
      width: '100%',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      flex: '3',
    }}>
      <img src="images/buzzer.jpg" alt="Buzzer" style={{ width: '50px', height: '50px' }} />
    </button>
  );
};

export default BuzzerButton;
