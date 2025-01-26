// src/components/FlipCardButton.js
'use client';

import React from 'react';

const FlipCardButton = ({ playerId }) => {
    const handleFlipCard = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/flip-card/${playerId}`, {
            method: 'GET',
          });
          const data = await response.json();
          if (response.ok) {
            console.log('Card flipped:', data);
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error flipping card:', error);
        }
    };

  return (
    <button onClick={handleFlipCard} style={{
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
