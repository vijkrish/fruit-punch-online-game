// src/components/BuzzerButton.js
'use client';

import React from 'react';

const BuzzerButton = () => {
  const handleBuzzerClick = () => {
    // Add logic to handle buzzer click event
    console.log('Buzzer button clicked!');
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
