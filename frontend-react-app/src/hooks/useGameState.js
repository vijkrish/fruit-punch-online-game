// src/hooks/useGameState.js
import { useState, useEffect } from 'react';

const useGameState = () => {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/state');
        const data = await response.json();
        if (response.ok) {
          setGameState(data);
        } else {
          console.error('Failed to fetch game state:', data.error);
        }
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    fetchGameState(); // Initial fetch
    const intervalId = setInterval(fetchGameState, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return gameState;
};

export default useGameState;
