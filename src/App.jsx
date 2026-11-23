import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Flag,
  ListTodo,
  TrendingUp,
} from 'lucide-react';
import { sampleTasks } from './data/sampleTasks.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import StatCard from './components/StatCard.jsx';
import FocusNotes from './components/FocusNotes.jsx';
import FilterTabs from './components/FilterTabs.jsx';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';

function StatusRing({ percent, color }) {
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="status-ring">
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="4"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
        />
      </svg>
      <span className="status-ring__text">{percent}%</span>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === 'To do').length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;

    const high = tasks.filter((t) => t.priority === 'High').length;
    const medium = tasks.filter((t) => t.priority === 'Medium').length;
    const low = tasks.filter((t) => t.priority === 'Low').length;

    const pct = (count) => (total === 0 ? 0 : Math.round((count / total) * 100));

    const categoryCounts = tasks.reduce((acc, t) => {
      if (t.category) acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      todo,
      inProgress,
      completed,
      high,
      medium,
      low,
      todoPct: pct(todo),
      inProgressPct: pct(inProgress),
      completedPct: pct(completed),
      categoryCounts,
      countsByStatus: {
        All: total,
        'To do': todo,
        'In progress': inProgress,
        Completed: completed,
      },
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch =
        !normalizedSearch || task.title.toLowerCase().includes(normalizedSearch);
      const matchesStatus =
        statusFilter === 'All' || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const hasActiveFilters =
    searchQuery.trim() !== '' || statusFilter !== 'All' || priorityFilter !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((item) => (item.id === editingTask.id ? taskData : item))
      );
    } else {
      setTasks((prev) => [taskData, ...prev]);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleStatusChange = (taskId, nextStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: nextStatus } : task
      )
    );
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    setTasks((prev) => prev.filter((task) => task.id !== taskToDelete.id));
    setTaskToDelete(null);
  };

  return (
    <div className="app-shell">
      <Sidebar
        activeStatus={statusFilter}
        onSelectStatus={setStatusFilter}
        taskCounts={stats.countsByStatus}
        categoryCounts={stats.categoryCounts}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="app-main-wrap">
        <Header
          onOpenCreate={handleOpenCreate}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          totalTasks={stats.total}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="main-content">
          <section className="stats-grid" aria-label="Dashboard statistics">
            <StatCard
              label="Total Tasks"
              value={stats.total}
              helper={`${stats.todo} waiting`}
              icon={ListTodo}
              tone="mint"
            />
            <StatCard
              label="In Progress"
              value={stats.inProgress}
              helper="Active right now"
              icon={Clock}
              tone="pink"
            />
            <StatCard
              label="Completed"
              value={stats.completed}
              helper="Finished tasks"
              icon={CheckCircle2}
              tone="lavender"
            />
            <StatCard
              label="Completion Rate"
              value={`${stats.completedPct}%`}
              helper={`${stats.completed} of ${stats.total} done`}
              icon={TrendingUp}
              tone="peach"
            />
          </section>

          <section className="analytics-grid" aria-label="Priority and status overview">
            <article className="panel-card">
              <div className="panel-card__header">
                <h2 className="panel-card__title">Priority Breakdown</h2>
              </div>
              <div className="priority-kpis">
                <div className="priority-kpi">
                  <span className="priority-kpi__badge priority-kpi__badge--high">
                    <Flag size={13} aria-hidden="true" />
                  </span>
                  <div>
                    <div className="priority-kpi__val">{stats.high}</div>
                    <div className="priority-kpi__label">High Priority</div>
                  </div>
                </div>
                <div className="priority-kpi">
                  <span className="priority-kpi__badge priority-kpi__badge--med">
                    <Flag size={13} aria-hidden="true" />
                  </span>
                  <div>
                    <div className="priority-kpi__val">{stats.medium}</div>
                    <div className="priority-kpi__label">Medium Priority</div>
                  </div>
                </div>
                <div className="priority-kpi">
                  <span className="priority-kpi__badge priority-kpi__badge--low">
                    <Flag size={13} aria-hidden="true" />
                  </span>
                  <div>
                    <div className="priority-kpi__val">{stats.low}</div>
                    <div className="priority-kpi__label">Low Priority</div>
                  </div>
                </div>
              </div>

              <div className="priority-bars">
                {[
                  { label: 'High', count: stats.high, color: '#6366f1' },
                  { label: 'Medium', count: stats.medium, color: '#f59e0b' },
                  { label: 'Low', count: stats.low, color: '#f97316' },
                ].map((row) => {
                  const widthPct =
                    stats.total === 0 ? 0 : Math.round((row.count / stats.total) * 100);
                  return (
                    <div key={row.label} className="priority-bar-row">
                      <span className="priority-bar-row__label">{row.label}</span>
                      <div className="priority-bar-row__track">
                        <div
                          className="priority-bar-row__fill"
                          style={{ width: `${widthPct}%`, backgroundColor: row.color }}
                        />
                      </div>
                      <span className="priority-bar-row__pct">{widthPct}%</span>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="panel-card">
              <div className="panel-card__header">
                <h2 className="panel-card__title">Status Overview</h2>
              </div>
              <div className="status-rows">
                <div className="status-row">
                  <div className="status-row__left">
                    <span
                      className="status-row__square"
                      style={{ backgroundColor: '#5b3df5' }}
                    />
                    <span>
                      <strong>To Do:</strong> {stats.todo} Tasks
                    </span>
                  </div>
                  <StatusRing percent={stats.todoPct} color="#5b3df5" />
                </div>

                <div className="status-row">
                  <div className="status-row__left">
                    <span
                      className="status-row__square"
                      style={{ backgroundColor: '#a855f7' }}
                    />
                    <span>
                      <strong>In Progress:</strong> {stats.inProgress} Tasks
                    </span>
                  </div>
                  <StatusRing percent={stats.inProgressPct} color="#a855f7" />
                </div>

                <div className="status-row">
                  <div className="status-row__left">
                    <span
                      className="status-row__square"
                      style={{ backgroundColor: '#f97316' }}
                    />
                    <span>
                      <strong>Completed:</strong> {stats.completed} Tasks
                    </span>
                  </div>
                  <StatusRing percent={stats.completedPct} color="#f97316" />
                </div>
              </div>
            </article>
          </section>

          <FocusNotes />

          <section className="tasks-section" aria-label="Task management">
            <div className="tasks-controls">
              <FilterTabs
                activeStatus={statusFilter}
                onStatusChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityChange={setPriorityFilter}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
              />
            </div>

            <TaskList
              tasks={filteredTasks}
              onStatusChange={handleStatusChange}
              onEdit={handleOpenEdit}
              onDelete={setTaskToDelete}
              hasActiveFilters={hasActiveFilters}
              onResetFilters={handleResetFilters}
              onCreateTask={handleOpenCreate}
            />
          </section>
        </main>
      </div>

      {isFormOpen && (
        <TaskForm
          initialTask={editingTask}
          onSubmit={handleSaveTask}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}

      {taskToDelete && (
        <ConfirmDialog
          taskTitle={taskToDelete.title}
          onConfirm={handleConfirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
}