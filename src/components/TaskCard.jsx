import { Calendar, Pencil, Trash2 } from 'lucide-react';

const STATUS_OPTIONS = ['To do', 'In progress', 'Completed'];

const STATUS_CLASS = {
  'To do': 'badge--todo',
  'In progress': 'badge--progress',
  Completed: 'badge--completed',
};

const PRIORITY_CLASS = {
  High: 'priority--high',
  Medium: 'priority--medium',
  Low: 'priority--low',
};

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const formattedDate = task.dueDate
    ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No due date';

  return (
    <article className="task-card">
      <div className="task-card__main">
        <div className="task-card__badges">
          <span className={`badge ${STATUS_CLASS[task.status] || ''}`}>
            {task.status}
          </span>
          <span className={`badge priority-badge ${PRIORITY_CLASS[task.priority] || ''}`}>
            {task.priority} Priority
          </span>
          {task.category && (
            <span className="badge badge--category">{task.category}</span>
          )}
        </div>

        <h3
          className={`task-card__title ${
            task.status === 'Completed' ? 'task-card__title--done' : ''
          }`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="task-card__desc">{task.description}</p>
        )}

        <div className="task-card__meta">
          <span className="task-card__date">
            <Calendar size={14} aria-hidden="true" />
            <span>Due {formattedDate}</span>
          </span>
        </div>
      </div>

      <div className="task-card__actions">
        <div className="task-card__status-control">
          <label htmlFor={`status-${task.id}`} className="sr-only">
            Update status for {task.title}
          </label>
          <select
            id={`status-${task.id}`}
            className="status-select"
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="task-card__btn-group">
          <button
            type="button"
            className="icon-btn"
            onClick={() => onEdit(task)}
            aria-label={`Edit task: ${task.title}`}
            title="Edit task"
          >
            <Pencil size={17} />
          </button>
          <button
            type="button"
            className="icon-btn icon-btn--danger"
            onClick={() => onDelete(task)}
            aria-label={`Delete task: ${task.title}`}
            title="Delete task"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}