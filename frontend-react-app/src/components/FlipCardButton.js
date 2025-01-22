// src/components/FlipCardButton.js
'use client';

import React from 'react';

const FlipCardButton = ({ playerId, onCardFlipped }) => {
    const handleFlipCard = async () => {
        try {

            // DELETE THIS LINE
            playerId = 0;
          const response = await fetch(`http://127.0.0.1:5000/flip-card/${playerId}`, {
            method: 'GET',
          });
          const data = await response.json();
          if (response.ok) {
            console.log('Card flipped:', data);
            onCardFlipped(data.top_card_fruit, data.top_card_quantity); // Pass the card data to the parent component
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
