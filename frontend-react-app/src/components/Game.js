// src/app/page.js
'use client';

import React, { useState } from 'react';
import Card from './Card';
import Players from './Players';
import FlipCardButton from './FlipCardButton';
import BuzzerButton from './BuzzerButton';
import useGameState from '../hooks/useGameState';
import Lobby from './Lobby';

const GamePage = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentPlayerId, setCurrentPlayerId] = useState(0);
  const [players, setPlayers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const renderGameState = (newGameState) => {
    setPlayers(newGameState.players.map(player => ({
      id: player.player_id,
      name: player.name,
      hand: {
        fruit: player.top_card.fruit,
        quantity: player.top_card.quantity,
      },
      num_cards: player.num_cards,
    })));
    setCurrentPlayerId(newGameState.current_player_id);
    setGameOver(newGameState.game_over);
    setWinner(newGameState.winner);
  };

  const handleStartGame = (sid, pid) => {
    fetch(`http://10.0.0.179:5001/start/${sid}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Game started successfully:', data);
      setSessionId(sid);
      setMyPlayerId(pid);
      setIsGameStarted(true);
    })
    .catch(error => {
      console.error('Failed to start game:', error);
    });
  };

  const joinGame = (sid, pid) => {
    setSessionId(sid);
    setMyPlayerId(pid);
    setIsGameStarted(true);
  };

  useGameState(renderGameState, isGameStarted, sessionId);

  const isMyTurn = currentPlayerId === myPlayerId;

  if (!isGameStarted) {
    return <Lobby handleStartGame={handleStartGame} joinGame={joinGame}/>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      {gameOver ? (
        <div style={{textAlign: 'center', padding: '50px'}}>
          <h1>Game Over!</h1>
          <h2>{winner} wins!</h2>
          <button className="btn btn-primary btn-lg" onClick={() => window.location.reload()}>
            Play Again
          </button>
        </div>
      ) : (
        <>
          <Players players={players} currentPlayerId={currentPlayerId} />
          <div style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            borderTop: '1px solid #ccc',
          }}>
            <FlipCardButton playerId={myPlayerId} sessionId={sessionId} isMyTurn={isMyTurn} />
            <BuzzerButton playerId={myPlayerId} sessionId={sessionId} />
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage;
