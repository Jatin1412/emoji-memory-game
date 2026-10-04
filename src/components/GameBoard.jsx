import Card from "./Card";

function GameBoard({ cards, flipped, matched, onCardClick }) {

  return (
    <div className="game-board ">

      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          flipped={flipped.includes(card.id)}
          matched={matched.includes(card.id)}
          onClick={() => onCardClick(card)}
        />
        
      ))}

    </div>
  );
}

export default GameBoard;