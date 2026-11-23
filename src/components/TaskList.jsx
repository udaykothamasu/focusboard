import { ClipboardList } from 'lucide-react';
import TaskCard from './TaskCard.jsx';

export default function TaskList({
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
  hasActiveFilters,
  onResetFilters,
  onCreateTask,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon" aria-hidden="true">
          <ClipboardList size={32} />
        </div>
        <h3 className="empty-state__title">
          {hasActiveFilters ? 'No matching tasks found' : 'No tasks yet'}
        </h3>
        <p className="empty-state__text">
          {hasActiveFilters
            ? 'Try adjusting your search query, status tab, or priority filter.'
            : 'Create your first task to start tracking progress on FocusBoard.'}
        </p>
        {hasActiveFilters ? (
          <button type="button" className="btn btn--secondary" onClick={onResetFilters}>
            Clear Filters
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={onCreateTask}>
            Create First Task
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="task-list" role="list" aria-label="Tasks">
      {tasks.map((task) => (
        <div key={task.id} role="listitem">
          <TaskCard
            task={task}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}