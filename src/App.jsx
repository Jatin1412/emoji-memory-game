import { useState, useEffect, useRef } from "react";
import "./App.css";
// Components
import GameScreen from "./components/GameScreen";
import StartScreen from "./components/StartScreen";
import { createCards } from "./utils/createCards";
import WinScreen from "./components/WinScreen";

const pairCounts = {
  easy: 12,
  medium: 18,
  hard: 25,
};

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [wrong, setWrong] = useState([]);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const wrongTimeoutRef = useRef(null);
  const wrongTimeoutStartedAt = useRef(0);
  const mismatchRemaining = useRef(1000);

  const gameWon = cards.length > 0 && matched.length === cards.length;

  const matchedPairs = matched.length / 2;

  const accuracy = moves > 0 ? Math.round((matchedPairs / moves) * 100) : 0;

  useEffect(() => {
    if (!gameStarted || isPaused || gameWon) {
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, isPaused, gameWon]);

  useEffect(() => {
    if (isPaused && wrongTimeoutRef.current) {
      mismatchRemaining.current = Math.max(
        0,
        mismatchRemaining.current - (Date.now() - wrongTimeoutStartedAt.current),
      );
      clearTimeout(wrongTimeoutRef.current);
      wrongTimeoutRef.current = null;
    } else if (!isPaused && wrong.length === 2 && !wrongTimeoutRef.current) {
      scheduleMismatchFlip(mismatchRemaining.current);
    }
  }, [isPaused, wrong]);

  useEffect(() => () => clearTimeout(wrongTimeoutRef.current), []);

  function scheduleMismatchFlip(delay) {
    wrongTimeoutStartedAt.current = Date.now();
    wrongTimeoutRef.current = setTimeout(() => {
      setFlipped([]);
      setWrong([]);
      wrongTimeoutRef.current = null;
      mismatchRemaining.current = 1000;
    }, delay);
  }

  function clearMismatchTimeout() {
    clearTimeout(wrongTimeoutRef.current);
    wrongTimeoutRef.current = null;
    mismatchRemaining.current = 1000;
  }

  function startGame() {
    const newCards = createCards(pairCounts[difficulty]);

    setCards(newCards);
    setFlipped([]);
    setMatched([]);
    setWrong([]);
    setMoves(0);

    setTime(0);
    setIsPaused(false);
    clearMismatchTimeout();

    setGameStarted(true);
  }

  function handleCardClick(card) {
    if (
      isPaused ||
      flipped.length === 2 ||
      matched.includes(card.id) ||
      card.id === flipped[0]
    ) {
      return;
    }

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);

      const firstCard = cards.find((card) => card.id === newFlipped[0]);

      const secondCard = cards.find((card) => card.id === newFlipped[1]);

      if (firstCard.emoji === secondCard.emoji) {
        const newMatched = [...matched, firstCard.id, secondCard.id];
        setMatched(newMatched);
        setFlipped([]);
      } else {
        mismatchRemaining.current = 1000;
        setWrong(newFlipped);
        scheduleMismatchFlip(1000);
      }
    }
  }

  function resetGame() {
    clearMismatchTimeout();

    setCards(createCards(pairCounts[difficulty]));
    setFlipped([]);
    setMatched([]);
    setWrong([]);
    setMoves(0);

    setTime(0);
    setIsPaused(false);
  }

  function changeDifficulty(nextDifficulty) {
    clearMismatchTimeout();

    setDifficulty(nextDifficulty);
    setCards(createCards(pairCounts[nextDifficulty]));
    setFlipped([]);
    setMatched([]);
    setWrong([]);
    setMoves(0);
    setTime(0);
    setIsPaused(false);
  }

  function exitGame() {
    clearMismatchTimeout();

    setGameStarted(false);
    setCards([]);
    setFlipped([]);
    setMatched([]);
    setWrong([]);
    setMoves(0);
    setTime(0);
    setIsPaused(false);
  }

  return (
    <>
      {!gameStarted ? (
        <StartScreen
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onPlay={startGame}
        />
      ) : gameWon ? (
        <WinScreen
          time={time}
          moves={moves}
          accuracy={accuracy}
          onPlayAgain={resetGame}
          onBackHome={exitGame}
        />
      ) : (
        <GameScreen
          cards={cards}
          flipped={flipped}
          matched={matched}
          wrong={wrong}
          moves={moves}
          time={time}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          difficulty={difficulty}
          onRestart={resetGame}
          onExit={exitGame}
          onChangeDifficulty={changeDifficulty}
          onCardClick={handleCardClick}
        />
      )}
    </>
  );
}

export default App;
