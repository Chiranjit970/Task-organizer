import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Clock } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  selectedDate: string;
}

export function TaskList({ 
  tasks, 
  onToggleComplete, 
  onUpdateTask, 
  onDeleteTask, 
  selectedDate 
}: TaskListProps) {
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
  const isToday = selectedDate === new Date().toISOString().split('T')[0];
  const dateLabel = isToday ? 'Today' : new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (tasks.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Clock className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No tasks for {dateLabel}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isToday ? "Add your first task above to get started!" : "No tasks were added on this day."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {incompleteTasks.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Tasks for {dateLabel}
              <span className="text-sm font-normal text-muted-foreground">
                ({incompleteTasks.length} pending)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {incompleteTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {completedTasks.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-green-600" />
              Completed Tasks
              <span className="text-sm font-normal text-muted-foreground">
                ({completedTasks.length} done)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}