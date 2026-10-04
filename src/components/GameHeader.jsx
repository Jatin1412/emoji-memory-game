function GameHeader({ moves, onRestart }) {

  return (
    <header>
      <h1>Emoji Match</h1>

      <p>Moves: {moves}</p>

      <button onClick={onRestart}>
        Restart
      </button>
    </header>
  );
}

export default GameHeader;