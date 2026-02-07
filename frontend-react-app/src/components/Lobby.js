// src/components/Lobby.js
'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Lobby.css';



const Lobby = ( {handleStartGame, joinGame} ) => {
  const [username, setUsername] = useState('');
  const [gameId, setGameId] = useState('');
  const [isGameHosted, setIsGameHosted] = useState(false);
  const [myPlayerId, setMyPlayerId] = useState(null);


  const handleHostGame = () => {
    if (username) {
      fetch(`http://10.0.0.179:5001/host-game/${username}`, {
        method: 'GET',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Game hosted successfully:', data);
        setIsGameHosted(true);
        setGameId(data.session_id);
        setMyPlayerId(data.player_id);
      })
      .catch(error => {
        console.error('Failed to host game:', error);
      });
    } else {
      alert('Please enter a username');
    }
  };

  const handleJoinGame = () => {
    if (username && gameId) {
      fetch(`http://10.0.0.179:5001/join/${gameId}/${username}`, {
        method: 'GET',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Game joined successfully:', data);
        setMyPlayerId(data.player_id);
        joinGame(gameId, data.player_id);
      })
      .catch(error => {
        console.error('Failed to join game:', error);
      });
    } else {
      alert('Please enter a username and game ID');
    }
  };

  const startGameUI = () => {
    console.log('startGameUI');
    return (
      <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">You are the host (Session ID: {gameId})</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p> Share the Session ID with your friends. Once everyone joins, click Start Game! </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleStartGame(gameId, myPlayerId)}>Start Game</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const joinOrHostGameUI = () => {
    return (
      <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-8 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white col-xs-8" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="typeEmailX">User Name</label>
                      <input type="text"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <button data-mdb-button-init data-mdb-ripple-init className="btn btn-lg px-5 btn-primary" type="submit" onClick={handleHostGame}>Host</button>
                    </div>

                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    (or)
                  </div>

                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typeEmailX">Session Code</label>
                    <input type="text"
                      className="form-control form-control-lg"
                      value={gameId}
                      onChange={(e) => setGameId(e.target.value)}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-lg px-5 btn-primary" type="submit" onClick={handleJoinGame}>Join</button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
    );
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h1 className="fw-bold mb-2 text-uppercase">Fruit Punch Game</h1>
        </div>

        {isGameHosted ? startGameUI() : joinOrHostGameUI()}
      </div>
    </section>
  );
};

export default Lobby;
