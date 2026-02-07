// src/hooks/useGameState.js
import { useState, useEffect } from 'react';

const useGameState = (onGameStateUpdate, isGameStarted, sessionId) => {
  // onGameStateUpdate is a callback function that will be called with the new game state
  // It is responsible for updating the UI with the new game state

  useEffect(() => {
    // Fetch the game state from the server every second
    console.log('Fetching game state...');
    const fetchGameState = async () => {
      try {
        const response = await fetch(`http://10.0.0.179:5001/state/${sessionId}`, {
          method: 'GET',
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Fetched game state:', data);
          onGameStateUpdate(data);
        } else {
          console.error('Failed to fetch game state:', data.error);
        }
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    if (isGameStarted && sessionId) {
      fetchGameState(); // Initial fetch
      const intervalId = setInterval(fetchGameState, 1000); // Fetch every second
      return () => clearInterval(intervalId); // Cleanup on unmount
    }

  }, [isGameStarted, sessionId]);
};

export default useGameState;
