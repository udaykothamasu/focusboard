import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  CheckCircle2,
  Sparkles,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'All', label: 'Overview', icon: LayoutDashboard },
  { id: 'To do', label: 'To Do', icon: CheckSquare },
  { id: 'In progress', label: 'In Progress', icon: Clock },
  { id: 'Completed', label: 'Completed', icon: CheckCircle2 },
];

const CATEGORIES = [
  { name: 'Design', color: '#06b6d4' },
  { name: 'Development', color: '#6366f1' },
  { name: 'Testing', color: '#f97316' },
  { name: 'Research', color: '#ec4899' },
];

export default function Sidebar({
  activeStatus,
  onSelectStatus,
  taskCounts,
  categoryCounts,
  isOpen,
  onClose,
}) {
  const handleNavClick = (status) => {
    onSelectStatus(status);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
        aria-label="Primary navigation"
      >
        <div className="sidebar__brand">
          <div className="sidebar__logo" aria-hidden="true">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="sidebar__title">FocusBoard</span>
          </div>
          <button
            type="button"
            className="icon-btn sidebar__close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar__nav">
          <p className="sidebar__section-label">Workspace</p>
          <ul className="sidebar__list">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const isActive = activeStatus === id;
              const count = taskCounts[id] ?? 0;
              return (
                <li key={id}>
                  <button
                    type="button"
                    className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                    onClick={() => handleNavClick(id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="sidebar__link-left">
                      <Icon size={17} aria-hidden="true" />
                      <span>{label}</span>
                    </span>
                    <span className="sidebar__badge">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar__projects">
          <p className="sidebar__section-label">Categories</p>
          <ul className="sidebar__list">
            {CATEGORIES.map((cat) => (
              <li key={cat.name} className="sidebar__category-item">
                <span className="sidebar__link-left">
                  <span
                    className="sidebar__dot"
                    style={{ backgroundColor: cat.color }}
                    aria-hidden="true"
                  />
                  <span>{cat.name}</span>
                </span>
                <span className="sidebar__cat-count">
                  {categoryCounts[cat.name] ?? 0}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__footer">
          <p className="sidebar__tip-title">Local Storage Sync</p>
          <p className="sidebar__tip-text">
            Tasks save automatically in your browser.
          </p>
        </div>
      </aside>
    </>
  );
}