// src/components/FlipCardButton.js
'use client';

import React from 'react';

const FlipCardButton = ({ playerId, sessionId, isMyTurn }) => {
    const handleFlipCard = async () => {
        try {
          const response = await fetch(`http://10.0.0.179:5001/flip-card/${sessionId}/${playerId}`, {
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
    <button
      onClick={handleFlipCard}
      disabled={!isMyTurn}
      style={{
        padding: '20px',
        fontSize: '24px',
        width: '50%',
        backgroundColor: isMyTurn ? '#4CAF50' : '#9E9E9E',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: isMyTurn ? 'pointer' : 'not-allowed',
        opacity: isMyTurn ? 1 : 0.7,
      }}>
      {isMyTurn ? 'Flip Card' : "Opponent's Turn"}
    </button>
  );
};

export default FlipCardButton;
