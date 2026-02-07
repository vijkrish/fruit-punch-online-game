# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fruit Punch is an online multiplayer card game inspired by Halli Galli, built with a Flask (Python) backend and a Next.js 15 / React 19 frontend. Players take turns flipping cards showing fruit (1-5 quantity), and race to hit the bell when exactly 5 of one fruit type are visible across all players' top cards.

## Commands

### Backend
```bash
pip install -r requirements.txt    # also need: pip install flask-cors (missing from requirements.txt)
cd backend && python app.py        # runs Flask dev server on http://127.0.0.1:5000
```

### Frontend
```bash
cd frontend-react-app
npm install
npm run dev       # Next.js dev server on http://localhost:3000
npm run build     # production build
npm run lint      # runs next lint
```

No test framework is configured for either frontend or backend.

## Architecture

### Communication Pattern
- REST API over HTTP with **polling** (not WebSockets)
- Frontend polls `GET /state` every 1 second via the `useGameState` custom hook
- All API endpoints are GET requests (no POST/PUT/DELETE)
- CORS enabled via `flask-cors`

### Backend (`backend/`)
- **`app.py`** — Flask entry point, defines all API routes, stores game state in module-level global variables (no database, no session isolation)
- **`utils/card.py`** — `Card` class and `init_cards()` to build the 56-card deck (4 fruits × 14 cards each)
- **`utils/pile.py`** — `Pile` class that tracks played cards and implements the bell-hit check (sum of each fruit across top cards == 5)
- **`utils/player.py`** — `Player` class and `init_players()` factory
- **`utils/gamegen.py`** — Session ID generator (4-digit random codes, WIP)

### Frontend (`frontend-react-app/src/`)
- Uses Next.js **App Router** with `'use client'` directives (client-side rendering)
- Path alias: `@/*` maps to `./src/*` (configured in `jsconfig.json`)
- **`components/Game.js`** — Main game orchestrator; calls `/init/<n>` to start, renders players/cards/buttons
- **`components/Lobby.js`** — Pre-game lobby for hosting/joining sessions (WIP)
- **`components/Card.js`** — Renders individual card with fruit image
- **`components/Players.js`** — Displays player grid with top cards
- **`components/FlipCardButton.js`** — Calls `GET /flip-card/<player_id>`
- **`components/BuzzerButton.js`** — Bell button (click handler is currently a stub, not wired to API)
- **`hooks/useGameState.js`** — Custom hook that polls `/state` every second and returns game state
- **`css/`** — Component stylesheets; also uses Bootstrap 5.3

### API Endpoints (all GET)
| Endpoint | Purpose |
|---|---|
| `/init/<num_players>` | Initialize/reset game, deal cards |
| `/state` | Return full game state (polled by frontend) |
| `/flip-card/<player_id>` | Flip current player's top card |
| `/hit-bell/<player_id>` | Claim bell hit (5 of one fruit visible) |
| `/host-game/<playername>` | Create new session, return session_id |
| `/join/<session_id>/<playername>` | Join existing session |

### Key Constraints
- All game state lives in Python global variables — only one game instance exists at a time on the server
- The lobby/session system (`gamegen.py`, `Lobby.js`) is work-in-progress and does not yet provide session isolation
- Backend and frontend must both be running simultaneously for the game to work
