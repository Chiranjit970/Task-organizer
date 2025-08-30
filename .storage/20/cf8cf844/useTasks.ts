import { useState, useEffect } from 'react';
import { Task, TasksByDate } from '@/types/task';
import { calculatePriority } from '@/utils/priorityAlgorithm';

const STORAGE_KEY = 'task-organizer-data';

export function useTasks() {
  const [tasksByDate, setTasksByDate] = useState<TasksByDate>({});
  const [selectedDate, setSelectedDate] = useState<string>(getTodayString());
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        Object.keys(parsed).forEach(date => {
          parsed[date] = parsed[date].map((task: Task) => ({
            ...task,
            createdAt: new Date(task.createdAt)
          }));
        });
        setTasksByDate(parsed);
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasksByDate changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksByDate));
  }, [tasksByDate]);

  const addTask = (name: string, description: string, date: string = selectedDate) => {
    const priority = calculatePriority(name, description);
    const newTask: Task = {
      id: generateId(),
      name,
      description,
      priority,
      completed: false,
      createdAt: new Date(),
      date
    };

    setTasksByDate(prev => {
      const updatedTasks = [...(prev[date] || []), newTask];
      return {
        ...prev,
        [date]: sortTasksByPriority(updatedTasks)
      };
    });
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasksByDate(prev => {
      const newTasksByDate = { ...prev };
      Object.keys(newTasksByDate).forEach(date => {
        newTasksByDate[date] = newTasksByDate[date].map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        );
        newTasksByDate[date] = sortTasksByPriority(newTasksByDate[date]);
      });
      return newTasksByDate;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasksByDate(prev => {
      const newTasksByDate = { ...prev };
      Object.keys(newTasksByDate).forEach(date => {
        newTasksByDate[date] = newTasksByDate[date].filter(task => task.id !== taskId);
      });
      return newTasksByDate;
    });
  };

  const toggleTaskComplete = (taskId: string) => {
    updateTask(taskId, { completed: !getCurrentTasks().find(t => t.id === taskId)?.completed });
  };

  const getCurrentTasks = (): Task[] => {
    return tasksByDate[selectedDate] || [];
  };

  const getAvailableDates = (): string[] => {
    return Object.keys(tasksByDate).sort((a, b) => b.localeCompare(a)); // Most recent first
  };

  return {
    tasks: getCurrentTasks(),
    selectedDate,
    setSelectedDate,
    isHistoryOpen,
    setIsHistoryOpen,
    availableDates: getAvailableDates(),
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete
  };
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function sortTasksByPriority(tasks: Task[]): Task[] {
  return tasks.sort((a, b) => {
    // First sort by completion status (incomplete tasks first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then by priority (higher priority first)
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    // Finally by creation time (newer first)
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}