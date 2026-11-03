import { Task } from '@/server/data/taskStore';
import TaskItem from './TaskItem';
import { Inbox } from 'lucide-react';

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma tarefa encontrada</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Comece criando uma nova tarefa para organizar suas atividades.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
