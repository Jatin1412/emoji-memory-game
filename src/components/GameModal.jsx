import { useEffect, useRef } from "react";

function GameModal({ title, onClose, children, className = "" }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

        if (!focusable?.length) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="game-modal-overlay" onClick={onClose}>
      <section
        ref={dialogRef}
        className={`game-modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="game-modal__header">
          <h2 id="game-modal-title">{title}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="game-modal__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}

export default GameModal;
