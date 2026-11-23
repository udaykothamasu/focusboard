import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const STATUS_OPTIONS = ['To do', 'In progress', 'Completed'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];
const CATEGORY_OPTIONS = ['Design', 'Development', 'Testing', 'Research'];

export default function TaskForm({ initialTask, onSubmit, onCancel }) {
  const isEditing = Boolean(initialTask);

  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [status, setStatus] = useState(initialTask?.status || 'To do');
  const [priority, setPriority] = useState(initialTask?.priority || 'Medium');
  const [category, setCategory] = useState(initialTask?.category || 'Development');
  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate || new Date().toISOString().split('T')[0]
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const validate = () => {
    const nextErrors = {};
    if (!title.trim()) nextErrors.title = 'Task title is required.';
    if (!status) nextErrors.status = 'Status is required.';
    if (!priority) nextErrors.priority = 'Priority is required.';
    if (!dueDate) nextErrors.dueDate = 'Due date is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      id: initialTask?.id || `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      category,
      dueDate,
    });
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      <div className="modal-card modal-card--form">
        <div className="modal-header">
          <h2 id="task-form-title" className="modal-title">
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            type="button"
            className="icon-btn"
            onClick={onCancel}
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form className="task-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="task-title" className="form-label">
              Title <span className="required-mark">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              className={`form-input ${errors.title ? 'form-input--error' : ''}`}
              placeholder="e.g. Finalize responsive dashboard styles"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              autoFocus
            />
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="task-description" className="form-label">
              Description
            </label>
            <textarea
              id="task-description"
              rows={3}
              className="form-input form-textarea"
              placeholder="Add helpful context or acceptance criteria (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="task-status" className="form-label">
                Status <span className="required-mark">*</span>
              </label>
              <select
                id="task-status"
                className="form-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="task-priority" className="form-label">
                Priority <span className="required-mark">*</span>
              </label>
              <select
                id="task-priority"
                className="form-input"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="task-category" className="form-label">
                Category
              </label>
              <select
                id="task-category"
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="task-due-date" className="form-label">
                Due Date <span className="required-mark">*</span>
              </label>
              <input
                id="task-due-date"
                type="date"
                className={`form-input ${errors.dueDate ? 'form-input--error' : ''}`}
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: undefined }));
                }}
              />
              {errors.dueDate && <p className="form-error">{errors.dueDate}</p>}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn--secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}