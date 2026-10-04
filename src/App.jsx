import { useState } from 'react';
import './App.css'
// Components
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  return (
    <>
      {!gameStarted ? (
        <StartScreen
          onPlay={() => setGameStarted(true)}
        />
      ) : (
        <GameScreen
          cards={cards}
          flipped={flipped}
          matched={matched}
          moves={moves}
        />
      )}
    </>
  );

}

export default App
