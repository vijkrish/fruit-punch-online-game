// src/components/Player.js
import React from 'react';
import Card from './Card';

const Player = ({ name, hand }) => {
  return (
    <div className="player">
      <h1>{name}</h1>
      <ul>
        {hand.map((card, index) => (
          <li key={index}>
            <Card fruit={card.fruit} quantity={card.quantity} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Player;
