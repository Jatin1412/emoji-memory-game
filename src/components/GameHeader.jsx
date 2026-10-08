function GameHeader({
  moves,
  time,
  isPaused,
  setIsPaused,
  onMenu,
}) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedTime =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <header className="game-header">
      <div className="game-header__brand">
        <span className="game-header__logo" aria-hidden="true">🧠</span>
        <div>
          <h1 className="game-header__title">Emoji Memory</h1>
          <p className="game-header__subtitle">Find all matching pairs</p>
        </div>
      </div>

      <div className="game-header__controls">
        <div className="game-header__stat">
          <span className="game-header__label">Moves</span>
          <span className="game-header__value">{moves}</span>
        </div>

        <div className="game-header__stat game-header__timer">
          <span className="game-header__label">Time</span>
          <span className="game-header__value"><span aria-hidden="true">⏱</span> {formattedTime}</span>
        </div>

        <div className="game-header__actions">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="game-header__button"
            aria-label={isPaused ? "Resume game" : "Pause game"}
          >
            <span aria-hidden="true">{isPaused ? "▶" : "⏸"}</span>
            <span className="game-header__button-label">{isPaused ? "Resume" : "Pause"}</span>
          </button>

          <button
            type="button"
            onClick={onMenu}
            className="game-header__button game-header__menu"
            aria-label="Open game menu"
            title="Open game menu"
          >
            <span aria-hidden="true">☰</span>
            <span className="game-header__button-label">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default GameHeader;