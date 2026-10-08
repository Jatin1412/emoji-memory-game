import { useRef, useState } from "react";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import GameModal from "./GameModal";
import HowToPlayModal from "./HowToPlayModal";

function GameScreen({
  cards,
  flipped,
  matched,
  wrong,
  moves,
  time,
  isPaused,
  setIsPaused,
  difficulty,
  onRestart,
  onExit,
  onChangeDifficulty,
  onCardClick,
}) {
  const [activeModal, setActiveModal] = useState(null);
  const wasPausedBeforeMenu = useRef(false);

  function openMenu() {
    wasPausedBeforeMenu.current = isPaused;
    setIsPaused(true);
    setActiveModal("menu");
  }

  function closeMenu() {
    setActiveModal(null);
    setIsPaused(wasPausedBeforeMenu.current);
  }

  function resumeGame() {
    setActiveModal(null);
    wasPausedBeforeMenu.current = false;
    setIsPaused(false);
  }

  function restartGame() {
    onRestart();
    resumeGame();
  }

  function chooseDifficulty(nextDifficulty) {
    onChangeDifficulty(nextDifficulty);
    resumeGame();
  }

  function cancelExit() {
    setActiveModal(null);
    setIsPaused(wasPausedBeforeMenu.current);
  }

  return (
    <main className="game-screen">
      <div className={`game-screen__content${isPaused ? " game-screen__content--paused" : ""}`}>
        <GameHeader
          moves={moves}
          time={time}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          onMenu={openMenu}
        />

        <GameBoard
          cards={cards}
          flipped={flipped}
          matched={matched}
          wrong={wrong}
          difficulty={difficulty}
          onCardClick={onCardClick}
        />

        {isPaused && (
          <div className="game-screen__pause-overlay">
            <div className="game-screen__pause-card">
              <span className="game-screen__pause-icon" aria-hidden="true">Ⅱ</span>
              <h2>Game Paused</h2>
              <p>Take a little break. Your game is right here.</p>
              <button type="button" className="game-screen__resume" onClick={resumeGame}>
                ▶ Resume Game
              </button>
              <button type="button" className="game-screen__pause-menu" onClick={openMenu}>
                Open Menu
              </button>
            </div>
          </div>
        )}
      </div>

      {activeModal === "menu" && (
        <GameModal title="Game Menu" onClose={closeMenu} className="game-modal--menu">
          <div className="game-menu">
            <button type="button" onClick={resumeGame}>▶ <span>Resume Game</span></button>
            <button type="button" onClick={restartGame}>↻ <span>Restart Game</span></button>
            <button type="button" onClick={() => setActiveModal("help")}>📖 <span>How to Play</span></button>
            <button type="button" onClick={() => setActiveModal("difficulty")}>⚙ <span>Change Difficulty</span></button>
            <button type="button" className="game-menu__exit" onClick={() => setActiveModal("exit")}>
              ↗ <span>Exit Game</span>
            </button>
          </div>
        </GameModal>
      )}

      {activeModal === "help" && <HowToPlayModal onClose={() => setActiveModal("menu")} />}

      {activeModal === "difficulty" && (
        <GameModal title="Change Difficulty" onClose={() => setActiveModal("menu")}>
          <p className="game-modal__copy">Choose a new board. This starts a fresh game.</p>
          <div className="game-modal__difficulty">
            {[
              ["easy", "Easy", "12 pairs"],
              ["medium", "Medium", "18 pairs"],
              ["hard", "Hard", "25 pairs"],
            ].map(([id, label, pairs]) => (
              <button
                key={id}
                type="button"
                className={difficulty === id ? "is-selected" : ""}
                aria-pressed={difficulty === id}
                onClick={() => chooseDifficulty(id)}
              >
                <span>{label}</span>
                <small>{pairs}</small>
              </button>
            ))}
          </div>
        </GameModal>
      )}

      {activeModal === "exit" && (
        <GameModal title="Exit Game?" onClose={cancelExit} className="game-modal--confirm">
          <p className="game-modal__copy">
            Are you sure you want to exit? Your current game progress will be lost.
          </p>
          <div className="game-modal__actions">
            <button type="button" className="game-modal__secondary" onClick={cancelExit}>Cancel</button>
            <button type="button" className="game-modal__danger" onClick={onExit}>Exit Game</button>
          </div>
        </GameModal>
      )}
    </main>
  );
}

export default GameScreen;
