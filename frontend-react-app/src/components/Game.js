// src/app/page.js
'use client';

import React, { useState, useEffect } from 'react';
import Card from './Card';
import Player from './Player';
import FlipCardButton from './FlipCardButton';
import BuzzerButton from './BuzzerButton';
import useGameState from '../hooks/useGameState';

const GamePage = () => {
  const [currentPlayerId, setCurrentPlayerId] = useState(0);

  const [players, setPlayers] = useState([
    { id: 0, name: 'Player 1', hand: { fruit: 'Lime', quantity: 3 } },
    { id: 1, name: 'Player 2', hand: { fruit: 'Banana', quantity: 4 } },
  ]);

  const renderGameState = (newGameState) => {
    setPlayers(newGameState.players.map(player => ({
      id: player.player_id,
      name: `Player ${player.player_id + 1}`,
      hand: {
        fruit: player.top_card.fruit,
        quantity: player.top_card.quantity,
      },
    })));
    setCurrentPlayerId(newGameState.current_player_id);
  };

  useGameState(renderGameState);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/init/2', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Game initialized successfully with 2 players');
      } catch (error) {
        console.error('Failed to initialize game:', error);
      }
    };

    initializeGame();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Ensures the container takes the full height of the viewport
    }}>
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
          <Player player={player} currentPlayerId={currentPlayerId} />
        ))}
      </div>
      <div style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        borderTop: '1px solid #ccc', // Optional: adds a border to separate the buttons from the grid
      }}>
        <FlipCardButton playerId={currentPlayerId} />
        <BuzzerButton />
      </div>
    </div>
  );
};

export default GamePage;
