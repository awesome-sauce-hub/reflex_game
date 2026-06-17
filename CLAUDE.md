# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server (localhost)
npm run build    # production build → dist/
npm run deploy   # build + push to gh-pages branch
```

No test suite yet.

## Architecture

Vanilla JS + Vite + Firebase Realtime Database. No framework.

```
index.html              # single page, loads js/main.js as ES module
css/style.css           # all styles
js/
  firebase-config.js    # Firebase init, exports `db`
  main.js               # all game logic
assets/
  reflex_game_state_machine.svg
```

### Game state machine (`js/main.js`)

Five states managed by `setState()`: `idle → armed → go → result` (or `armed → fail → idle`).

- `idle`: dark arena, "TAP TO START"
- `armed`: red-tinted, random delay 1.2–4s before `go`
- `go`: green-tinted, `goTimestamp` captured via `performance.now()`
- `result`: reaction time displayed in `#readout`, score saved to Firebase
- `fail`: tapped during `armed`, reset on next tap

### Firebase / leaderboard

`js/firebase-config.js` holds the hardcoded Firebase config (public project — intentional for this type of app). Scores stored at `scores/<playerName>` in Realtime Database. Only personal best is kept: `saveScore()` compares against existing entry before writing. `listenForScores()` uses `onValue` for live leaderboard updates.

Player name stored in `localStorage.playerName`, prompted once on first visit.

### Deployment

Vite base path set to `/reflex_game/` (GitHub Pages subdirectory). `npm run deploy` uses `gh-pages` to push `dist/` to the `gh-pages` branch.

## Planned features (from README)

- Personal best tracking (UI)
- Daily challenge mode
- 1v1 room-code battles
