# Flowboard

A single-page productivity app with a Tasks/Kanban board and a Daily Journal, built with Vue 3 (Composition API + `<script setup>`), TypeScript, Pinia, Vue Router, Tailwind CSS v4, VueUse, and vuedraggable. All data is persisted to the browser's LocalStorage — no backend required.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Other scripts

```bash
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
```

## Features

- **Tasks** (`/tasks`)
  - List view and Kanban view, toggled from the header
  - Custom drag-and-drop ordering, or automatic Priority sort (urgent → high → medium → low); dragging is disabled while priority-sorted
  - Full CRUD for tasks (title, description, priority, lane) via a modal
  - Full CRUD for lanes, including inline rename; a lane can't be deleted while it still has tasks in it
- **Journal** (`/journal`)
  - Left date rail: jump to today, step a day at a time, pick any date, browse past entries
  - Right editor panel with debounced auto-save and a save-state indicator
- **Shell**
  - Dark/light mode toggle (persisted)
  - Everything synced automatically to LocalStorage — refresh-safe

## Project structure

```
src/
  components/
    tasks/       TaskCard, PriorityBadge, LaneColumn, KanbanBoard, TaskListView, TaskFormModal
    journal/      DateRail, JournalEditor
    layout/       AppSidebar, ModalDialog
  stores/         task.ts, journal.ts  (Pinia, backed by @vueuse/core's useStorage)
  views/          TasksView.vue, JournalView.vue
  router/         index.ts
  types/          task.ts, journal.ts
  lib/            utils.ts
```
