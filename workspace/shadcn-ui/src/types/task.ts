export interface Task {
  id: string;
  name: string;
  description: string;
  priority: number;
  completed: boolean;
  createdAt: Date;
  date: string; // YYYY-MM-DD format
}

export enum PriorityLevel {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  URGENT = 4,
  CRITICAL = 5
}

export interface TasksByDate {
  [date: string]: Task[];
}