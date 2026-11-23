import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  CheckCircle2,
  Sparkles,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'All', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'To do', label: 'To Do', icon: CheckSquare },
  { id: 'In progress', label: 'In Progress', icon: Clock },
  { id: 'Completed', label: 'Completed', icon: CheckCircle2 },
];

export default function Sidebar({
  activeStatus,
  onSelectStatus,
  taskCounts,
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
            <Sparkles size={20} />
          </div>
          <div>
            <span className="sidebar__title">FocusBoard</span>
            <span className="sidebar__subtitle">Task Workspace</span>
          </div>
          <button
            type="button"
            className="icon-btn sidebar__close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          <p className="sidebar__section-label">Views</p>
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
                      <Icon size={18} aria-hidden="true" />
                      <span>{label}</span>
                    </span>
                    <span className="sidebar__badge">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar__footer">
          <p className="sidebar__tip-title">Local Storage Sync</p>
          <p className="sidebar__tip-text">
            Changes are saved automatically in your browser.
          </p>
        </div>
      </aside>
    </>
  );
}