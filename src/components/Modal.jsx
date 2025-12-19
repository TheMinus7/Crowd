export default function Modal({ open, title, subtitle, children, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-head">
          <div className="modal-titles">
            <div className="modal-title">{title}</div>
            {subtitle ? <div className="modal-subtitle">{subtitle}</div> : null}
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>

      <button
        type="button"
        className="modal-backdrop-btn"
        onClick={onClose}
        aria-label="Close modal"
      />
    </div>
  );
}
