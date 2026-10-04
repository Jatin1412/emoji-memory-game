function Card({ card, flipped, matched, onClick }) {

  const showEmoji = flipped || matched;

  return (
    <button
      onClick={onClick}
      className="
        aspect-square
        rounded-xl
        bg-slate-800
        text-3xl
        shadow-md
        transition
        hover:scale-105
      "
    >
      {showEmoji ? card.emoji : "❓"}
    </button>
  );
}

export default Card;