import { RotateCcw } from 'lucide-react';

const STATUS_TABS = ['All', 'To do', 'In progress', 'Completed'];
const PRIORITIES = ['All', 'High', 'Medium', 'Low'];

export default function FilterTabs({
  activeStatus,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  hasActiveFilters,
  onResetFilters,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-tabs" role="tablist" aria-label="Filter tasks by status">
        {STATUS_TABS.map((status) => {
          const isActive = activeStatus === status;
          return (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`filter-tab ${isActive ? 'filter-tab--active' : ''}`}
              onClick={() => onStatusChange(status)}
            >
              {status}
            </button>
          );
        })}
      </div>

      <div className="filter-bar__right">
        <div className="filter-select-wrap">
          <label htmlFor="priority-filter" className="filter-select-label">
            Priority
          </label>
          <select
            id="priority-filter"
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
          >
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority === 'All' ? 'All Priorities' : priority}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={onResetFilters}
          >
            <RotateCcw size={15} aria-hidden="true" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}