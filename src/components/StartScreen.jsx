import { useState } from "react";
import "../assets/css/StartScreen.css";
import HowToPlayModal from "./HowToPlayModal";

function StartScreen({
  difficulty,
  setDifficulty,
  onPlay,
}) {
  const [showHelp, setShowHelp] = useState(false);

  const levels = [
    {
      id: "easy",
      name: "Easy",
      cards: 24,
      pairs: 12,
      emoji: "🙂",
    },
    {
      id: "medium",
      name: "Medium",
      cards: 36,
      pairs: 18,
      emoji: "🧠",
    },
    {
      id: "hard",
      name: "Hard",
      cards: 50,
      pairs: 25,
      emoji: "🔥",
    },
  ];

  const selectedLevel =
    levels.find((level) => level.id === difficulty) || levels[1];

  return (
    <div className="startscreen">
      <div className="startscreen__panel">
        <header className="startscreen__header">
          <div className="startscreen__badge" aria-hidden="true">🧠</div>

          <h1 className="startscreen__title">Emoji Memory</h1>

          <p className="startscreen__subtitle">
            Match the pairs. Test your memory. Have fun.
          </p>
        </header>

        <div className="startscreen__selector" role="group" aria-label="Select difficulty">
          {levels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setDifficulty(level.id)}
              aria-pressed={difficulty === level.id}
              className={`startscreen__level ${
                difficulty === level.id ? "startscreen__level--selected" : ""
              }`}
            >
              <span className="startscreen__level-emoji">{level.emoji}</span>

              <span className="startscreen__level-name">{level.name}</span>

              <span className="startscreen__level-meta">{level.pairs}</span>
              <span className="startscreen__level-pairs">pairs</span>

              <span className="startscreen__level-submeta">{level.cards} cards</span>
            </button>
          ))}
        </div>

        <div className="startscreen__details" aria-live="polite">
          <span className="startscreen__details-label">Current Mode</span>

          <span className="startscreen__details-name">
            {selectedLevel.name} <span>· {selectedLevel.pairs} pairs</span>
          </span>

          <span className="startscreen__details-hint">{selectedLevel.cards} cards · Find every pair</span>
        </div>

        <div className="startscreen__actions">
          <button type="button" onClick={onPlay} className="startscreen__play">
            ▶ Play Game
          </button>

          <button
            type="button"
            onClick={() => setShowHelp(true)}
            className="startscreen__help"
          >
            📖 How to Play
          </button>
        </div>

        {showHelp && <HowToPlayModal onClose={() => setShowHelp(false)} />}
      </div>
    </div>
  );
}

export default StartScreen;