// src/components/BuzzerButton.js
'use client';

import React from 'react';

const BuzzerButton = ({ playerId, sessionId }) => {
  const handleBuzzerClick = () => {
    fetch(`http://10.0.0.179:5001/hit-bell/${sessionId}/${playerId}`)
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      })
      .catch(error => {
        console.error('Error hitting buzzer:', error);
      });
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
