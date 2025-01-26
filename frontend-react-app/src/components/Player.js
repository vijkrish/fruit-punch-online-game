// src/components/Player.js
import React from 'react';
import Card from './Card';

const Player = ({ player, currentPlayerId }) => {
  return (
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
    </div>
  );
};

export default Player;
