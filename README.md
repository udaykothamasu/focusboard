# FocusBoard

A responsive task management dashboard built with **React.js** and **Vite** for the MobileFirst frontend assignment.

## Features
- **Dynamic Overview Statistics:** Real-time Total Tasks, In Progress, Completed, and Completion Rate cards, plus Priority Breakdown bars and Status Overview circular progress rings derived directly from task state.
- **Full Task CRUD:** Create, edit, delete (with confirmation dialog), and update task status inline (`To do`, `In progress`, `Completed`).
- **Search & Multi-Filter:** Live, case-insensitive title search combinable with status tabs, priority dropdown (`High`, `Medium`, `Low`), and a filter reset button.
- **3-Slide Focus Notes Carousel:** Interactive carousel covering Quick Session, Deep Work, and Daily Affirmation with circular Previous/Next navigation and clickable dot indicators.
- **localStorage Persistence:** Tasks are persisted under `focusboard_tasks` with safe JSON parsing and 8 initial sample tasks loaded only when no saved data exists.
- **Responsive & Accessible:** Built for Desktop (`1440px`), Tablet (`768px`), and Mobile (`390px`) with semantic HTML, keyboard-accessible modals, and visible focus indicators.

## Tech Stack
- **Frontend:** React 18, JavaScript (ES6+), CSS3
- **Build Tool:** Vite 5
- **Icons:** Lucide React (`lucide-react`)
- **Persistence:** Browser `localStorage`

## Project Structure
```text
focusboard/
├── index.html
├── package.json
├── vite.config.js
├── screenshots/
├── README.md
├── AI_USAGE.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── sampleTasks.js
    ├── hooks/
    │   └── useLocalStorage.js
    └── components/
        ├── ConfirmDialog.jsx
        ├── FilterTabs.jsx
        ├── FocusNotes.jsx
        ├── Header.jsx
        ├── Sidebar.jsx
        ├── StatCard.jsx
        ├── TaskCard.jsx
        ├── TaskForm.jsx
        └── TaskList.jsx