import { useTasks } from '@/hooks/useTasks';
import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';
import { HistorySidebar } from '@/components/HistorySidebar';
import { Button } from '@/components/ui/button';
import { History, Calendar, CheckSquare2 } from 'lucide-react';

export default function TaskOrganizerPage() {
  const {
    tasks,
    selectedDate,
    setSelectedDate,
    isHistoryOpen,
    setIsHistoryOpen,
    availableDates,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete
  } = useTasks();

  const isToday = selectedDate === new Date().toISOString().split('T')[0];
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CheckSquare2 className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Organizer</h1>
              <p className="text-muted-foreground">
                Smart task management with automatic priority sorting
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-2"
          >
            <History className="h-4 w-4" />
            History
          </Button>
        </div>

        {/* Date and Stats */}
        <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div>
              <h2 className="font-semibold text-lg">
                {isToday ? 'Today' : new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedDate}
              </p>
            </div>
          </div>
          
          {totalCount > 0 && (
            <div className="text-right">
              <div className="text-lg font-semibold">
                {completedCount}/{totalCount}
              </div>
              <div className="text-sm text-muted-foreground">
                {completedCount === totalCount ? 'All done! 🎉' : 'tasks completed'}
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Task Input - Only show for today */}
          {isToday && (
            <div className="lg:col-span-1">
              <TaskInput onAddTask={addTask} />
            </div>
          )}
          
          {/* Task List */}
          <div className={isToday ? "lg:col-span-2" : "lg:col-span-3"}>
            <TaskList
              tasks={tasks}
              onToggleComplete={toggleTaskComplete}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              selectedDate={selectedDate}
            />
          </div>
        </div>

        {/* History Sidebar */}
        <HistorySidebar
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          availableDates={availableDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>
    </div>
  );
}