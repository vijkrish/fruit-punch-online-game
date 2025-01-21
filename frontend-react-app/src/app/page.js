// src/app/page.js
import React from 'react';
import Card from '../components/Card';
import FlipCardButton from '../components/FlipCardButton';
import BuzzerButton from '../components/BuzzerButton';

const HomePage = () => {
  const players = [
    { name: 'Player 1', hand: [{ fruit: 'Lime', quantity: 3 }] },
    { name: 'Player 2', hand: [{ fruit: 'Banana', quantity: 2 }] },
    { name: 'Player 3', hand: [{ fruit: 'Strawberry', quantity: 1 }] },
    { name: 'Player 4', hand: [{ fruit: 'Grape', quantity: 5 }] },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
      gap: '10px',
      justifyContent: 'center',
      alignItems: 'center',
      '@media (minWidth: 768px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      '@media (minWidth: 1024px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    }}>
      {players.map((player, index) => (
        <div key={index} style={{ textAlign: 'center' }}>
          <h2>{player.name}</h2>
          <Card fruit={player.hand[0].fruit} quantity={player.hand[0].quantity} />
        </div>
      ))}
      <div style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
        <FlipCardButton />
        <BuzzerButton />
      </div>
    </div>
  );
};

export default HomePage;
