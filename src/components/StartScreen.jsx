function StartScreen({ onPlay }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 text-center shadow-xl">

        <h1 className="mb-3 text-4xl font-bold">
          🧠 Emoji Match
        </h1>

        <p className="mb-6 text-slate-400">
          Find all matching emoji pairs!
        </p>

        <div className="mb-8 rounded-xl bg-slate-800 p-5 text-left">
          <h2 className="mb-3 text-xl font-semibold">
            How to Play
          </h2>

          <ul className="space-y-2 text-slate-300">
            <li>• Select two cards.</li>
            <li>• Find matching emojis.</li>
            <li>• Match all pairs to win.</li>
          </ul>
        </div>

        <button
          onClick={onPlay}
          className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
        >
          Play Game
        </button>

      </div>
    </div>
  );
}

export default StartScreen;