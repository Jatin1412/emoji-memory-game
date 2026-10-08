function WinScreen({
  time,
  moves,
  accuracy,
  onPlayAgain,
  onBackHome,
}) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedTime =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <main className="win-screen">
      <div className="win-screen__content">
        <div className="win-screen__emoji" aria-hidden="true">🎉</div>
        <h1 className="win-screen__title">You Win!</h1>
        <p className="win-screen__subtitle">Great job! You completed the game.</p>

        <div className="win-screen__stats">
          <div className="win-screen__stat">
            <span className="win-screen__icon" aria-hidden="true">⏱️</span>
            <span className="win-screen__label">Time</span>
            <span className="win-screen__value">{formattedTime}</span>
          </div>
          <div className="win-screen__stat">
            <span className="win-screen__icon" aria-hidden="true">🎯</span>
            <span className="win-screen__label">Moves</span>
            <span className="win-screen__value">{moves}</span>
          </div>
          <div className="win-screen__stat">
            <span className="win-screen__icon" aria-hidden="true">✨</span>
            <span className="win-screen__label">Accuracy</span>
            <span className="win-screen__value">{accuracy}%</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onPlayAgain}
          className="win-screen__button"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={onBackHome}
          className="win-screen__button win-screen__button--secondary"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}

export default WinScreen;