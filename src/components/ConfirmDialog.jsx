import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({ taskTitle, onConfirm, onCancel }) {
  return (
    <div
      className="modal-overlay"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
    >
      <div className="modal-card modal-card--confirm">
        <div className="confirm-icon" aria-hidden="true">
          <AlertTriangle size={24} />
        </div>
        <h2 id="confirm-dialog-title" className="modal-title">
          Delete Task?
        </h2>
        <p id="confirm-dialog-desc" className="confirm-text">
          Are you sure you want to delete <strong>"{taskTitle}"</strong>? This action
          cannot be undone.
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm}>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}