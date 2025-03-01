// src/components/Player.js
import React from 'react';
import Card from './Card';

const Players = ({ players, currentPlayerId }) => {

  const renderPlayer = (player, currentPlayerId) => (
    <div key={player.id} style={{ textAlign: 'center' }}>
      <h2 style={{
        color: currentPlayerId === player.id ? 'red' : 'black',
        fontWeight: currentPlayerId === player.id ? 'bold' : 'normal',
        backgroundColor: currentPlayerId === player.id ? 'yellow' : 'transparent',
        padding: '5px',
        borderRadius: '5px'
      }}>
        {player.name}
      </h2>
      <Card fruit={player.hand.fruit} quantity={player.hand.quantity} isEmpty={!player.hand.fruit} />
      <div style={{
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '16px',
        color: '#333'
      }}>
        <strong>Score:</strong> {player.num_cards}
      </div>

    </div>
  );

  return (
    <div style={{
      flex: '1', // Allows the player grid to take up available space
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
      {players.map((player) => (
        renderPlayer(player, currentPlayerId)
      ))}
    </div>
  );
};

export default Players;
