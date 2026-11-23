import { Menu, Plus, Search, X } from 'lucide-react';

export default function Header({
  onOpenCreate,
  onOpenSidebar,
  totalTasks,
  searchQuery,
  onSearchChange,
}) {
  return (
    <header className="header-wrap">
      <div className="topbar">
        <div className="topbar__left">
          <button
            type="button"
            className="icon-btn header__menu-btn"
            onClick={onOpenSidebar}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
          <div className="topbar-search">
            <Search className="topbar-search__icon" size={16} aria-hidden="true" />
            <label htmlFor="topbar-search-input" className="sr-only">
              Search tasks by title
            </label>
            <input
              id="topbar-search-input"
              type="search"
              className="topbar-search__input"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery ? (
              <button
                type="button"
                className="topbar-search__clear"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            ) : (
              <span className="topbar-search__kbd" aria-hidden="true">
                ⌘ K
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="header">
        <div>
          <h1 className="header__title">My Tasks</h1>
          <p className="header__subtitle">
            Track priorities, status, and daily focus across {totalTasks}{' '}
            {totalTasks === 1 ? 'task' : 'tasks'}.
          </p>
        </div>

        <button
          type="button"
          className="btn btn--primary header__cta"
          onClick={onOpenCreate}
        >
          <Plus size={17} aria-hidden="true" />
          <span>New Task</span>
        </button>
      </div>
    </header>
  );
}