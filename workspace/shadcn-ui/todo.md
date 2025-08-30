# Task Organizer App - MVP Implementation

## Core Features to Implement:
1. Task input interface with name and description
2. Automatic priority sorting algorithm
3. History sidebar with date navigation
4. Task completion tracking
5. Data persistence with localStorage

## Files to Create/Modify:

### 1. src/pages/Index.tsx
- Main task organizer interface
- Task input form (name + description)
- Task list display with priority sorting
- History sidebar toggle
- Task completion checkboxes

### 2. src/components/TaskInput.tsx
- Form component for adding new tasks
- Input validation
- Submit handler

### 3. src/components/TaskList.tsx
- Display sorted tasks
- Task completion toggle
- Edit/delete functionality
- Priority indicators

### 4. src/components/HistorySidebar.tsx
- Date navigation interface
- Previous days task viewing
- Similar to ChatGPT history UI

### 5. src/hooks/useTasks.tsx
- Custom hook for task management
- localStorage integration
- Priority sorting algorithm
- Date-based task organization

### 6. src/types/task.ts
- TypeScript interfaces for tasks
- Priority levels enum
- Task status types

### 7. src/utils/priorityAlgorithm.ts
- Keyword-based priority calculation
- Urgency detection logic
- Sorting algorithm

### 8. index.html
- Update title to "Task Organizer"

## Priority Algorithm Logic:
- Scan description for keywords: "urgent", "deadline", "important", "ASAP", "critical"
- Assign priority scores based on keyword presence
- Sort tasks by priority score (high to low)
- Consider task creation time as secondary sort criteria

## Data Structure:
```typescript
interface Task {
  id: string;
  name: string;
  description: string;
  priority: number;
  completed: boolean;
  createdAt: Date;
  date: string; // YYYY-MM-DD format
}
```

## Implementation Order:
1. Types and interfaces
2. Priority algorithm utility
3. Task management hook
4. UI components
5. Main page integration
6. Testing and refinement