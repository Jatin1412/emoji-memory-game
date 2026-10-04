function WinScreen({ moves, onPlayAgain }) {

  return (
    <div>
      <h1>🎉 You Win!</h1>

      <p>You completed the game in {moves} moves.</p>

      <button onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
}

export default WinScreen;