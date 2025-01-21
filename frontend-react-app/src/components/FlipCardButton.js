// src/components/FlipCardButton.js
'use client';

import React from 'react';

const FlipCardButton = () => {
  const handleFlipCardClick = () => {
    // Add logic to handle flip card click event
    console.log('Flip Card button clicked!');
  };

  return (
    <button onClick={handleFlipCardClick} style={{
      padding: '20px',
      fontSize: '24px',
      width: '50%',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }}>
      Flip Card
    </button>
  );
};

export default FlipCardButton;
