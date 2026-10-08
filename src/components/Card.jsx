import "../assets/css/card.css";

function Card({ card, flipped, matched, wrong, onClick }) {
  const showEmoji = flipped || matched;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`card-container${wrong ? " wrong" : ""}`}
      aria-label={`${showEmoji ? card.emoji : "Hidden card"}${matched ? ", matched" : ""}`}
      aria-pressed={showEmoji}
      disabled={matched}
    >
      <div
        className={`
          card-inner
          ${showEmoji ? "flipped" : ""}
          ${matched ? "matched" : ""}
        `}
      >
        {/* Back side */}
        <div className="card-face card-back" aria-hidden="true">?</div>

        {/* Front side */}
        <div className="card-face card-front">{card.emoji}</div>
      </div>
    </button>
  );
}

export default Card;
