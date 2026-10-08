import Card from "./Card";
import "../assets/css/card.css";

function GameBoard({ cards, flipped, matched, wrong, difficulty, onCardClick }) {
  return (
    <div className={`game-board-shell game-board-shell--${difficulty}`}>
      <div className={`game-board game-board--${difficulty}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={flipped.includes(card.id)}
            matched={matched.includes(card.id)}
            wrong={wrong.includes(card.id)}
            onClick={() => onCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;