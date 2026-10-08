import GameModal from "./GameModal";

function HowToPlayModal({ onClose }) {
  return (
    <GameModal title="How to Play" onClose={onClose} className="game-modal--help">
      <ol className="game-modal__instructions">
        <li><span>Flip two cards at a time.</span></li>
        <li><span>Find matching emojis to keep the pair.</span></li>
        <li><span>Wrong cards flip back after a short pause.</span></li>
        <li><span>Clear the board using as few moves as you can.</span></li>
      </ol>
      <button type="button" className="game-modal__primary" onClick={onClose}>
        Got It
      </button>
    </GameModal>
  );
}

export default HowToPlayModal;
